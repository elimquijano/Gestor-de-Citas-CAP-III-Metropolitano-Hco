import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import config from '../../../config'




const baseUrl = config.baseUrl;

interface Departamento {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  encargado: string;
  activo: string;
  created_at?: string;
}

interface DepartamentoState {
  departamentos: Departamento[];
  departamento: Departamento | null; // Agrega esta línea
  loading: boolean;
  error: string | null;
  deleteStatus: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  addStatus: 'idle' | 'loading' | 'fulfilled' | 'rejected'; // Agrega esta línea
  imageUrl: string;

}

const initialState: DepartamentoState = {
  departamentos: [],
  departamento: null, // Agrega esta línea
  loading: false,
  error: null,
  deleteStatus: 'idle',
  addStatus: 'idle',
  imageUrl: '',

};

export const fetchDepartamentos = createAsyncThunk(
  'departamento/fetchDepartamentos',
  async () => {
    const response = await axios.get(`${baseUrl}/departamento/buscardepartamento`);
    console.log(response.data);

    // Filtrar los objetos que no son departamentos
    const departamentos = response.data.filter((item: any) =>
      item.hasOwnProperty('id') &&
      item.hasOwnProperty('nombre') &&
      item.hasOwnProperty('imagen') &&
      item.hasOwnProperty('descripcion') &&
      item.hasOwnProperty('encargado') &&
      item.hasOwnProperty('activo') &&
      item.action !== 'error' // Excluir objetos de error
    );

    return departamentos;
  }
);

export const deleteDepartamento = createAsyncThunk(
  'departamento/deleteDepartamento',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.post(`${baseUrl}/departamento/eliminardepartamento/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const addDepartamento = createAsyncThunk<Departamento, Omit<Departamento, 'id'>, { rejectValue: string }>(
  'departamento/addDepartamento',
  async (newDepartamento: Omit<Departamento, 'id'>, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/departamento/agregardepartamento`, newDepartamento);
      

      // Verificar si la acción fue exitosa
      if (response.data.action === 'success') {
        // Recargar todos los departamentos
        dispatch(fetchDepartamentos());

        // Devolver el nuevo departamento
        return response.data.departamento;
      } else {
        // Si la acción no fue exitosa, devolver un error
        return rejectWithValue(response.data.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.toString());
    }
  }
);
export const updateDepartamento = createAsyncThunk(
  'departamento/updateDepartamento',
  async (updatedDepartamento: Departamento, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/departamento/actualizardepartamento/${updatedDepartamento.id}`, updatedDepartamento);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log('Error:', error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);
export const loadDepartamento = createAsyncThunk(
  'departamento/loadDepartamento',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/departamento/buscardepartamento`);
      console.log(response.data);

      const departamento = response.data.find((dept: Departamento) => dept.id.toString()  == id.toString());
      console.log(departamento);
      if (!departamento) {
        throw new Error(`No department found with id ${id}`);
      }

      return departamento;

    } catch (error: any) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);


export const uploadImage = createAsyncThunk(
  'departamento/uploadImage',
  async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('cloud_name', 'dxhd3fys3');
    formData.append('upload_preset', 'MetropolitanoApp');


    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dxhd3fys3/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  }
);

const departamentoSlice = createSlice({
  name: "departamento",
  initialState,
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleteStatus = 'idle';
      state.addStatus = 'idle';
    },
    uploadStart(state) {
      state.loading = true;
      state.error = null;
    }, uploadSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.imageUrl = action.payload;
    },
    uploadFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(fetchDepartamentos.fulfilled, (state, action: PayloadAction<Departamento[]>) => {
      state.departamentos = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchDepartamentos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDepartamentos.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteDepartamento.fulfilled, (state, action: PayloadAction<string>) => {
      state.departamentos = state.departamentos.filter(departamento => departamento.id !== action.payload);
      state.loading = false;
      state.deleteStatus = 'fulfilled';
    });
    builder.addCase(deleteDepartamento.pending, (state) => {
      state.loading = true;
      state.deleteStatus = 'loading';
    });
    builder.addCase(deleteDepartamento.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
      state.loading = false;
      state.error = action.error.message;
      state.deleteStatus = 'rejected';
    });
    builder.addCase(addDepartamento.fulfilled, (state, action: PayloadAction<Departamento>) => {
      state.departamentos.push(action.payload);
      state.loading = false;
      state.addStatus = 'fulfilled';
    });
    builder.addCase(addDepartamento.pending, (state) => {
      state.loading = true;
      state.addStatus = 'loading';
    });
    builder.addCase(addDepartamento.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
      state.loading = false;
      state.error = action.error.message;
      state.addStatus = 'rejected';
    });
    builder.addCase(updateDepartamento.fulfilled, (state, action: PayloadAction<Departamento>) => {
      const index = state.departamentos.findIndex(departamento => departamento.id === action.payload.id);
      if (index !== -1) {
        state.departamentos[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateDepartamento.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDepartamento.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(loadDepartamento.fulfilled, (state, action: PayloadAction<Departamento>) => {
      state.departamento = action.payload; // Asegúrate de tener un campo 'departamento' en tu estado
    });
    builder.addCase(uploadImage.fulfilled, (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    });
  },
});

export const { actions, reducer } = departamentoSlice;
export const { resetDeleteStatus, uploadStart, uploadSuccess, uploadFailure } = actions;
export default reducer;