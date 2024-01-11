import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import config from '../../../config'
import { fetchHorarios } from "../../../store/slices/horarioSlice";
const baseUrl = config.baseUrl;

interface Doctor {
  id: string | null;
  dni: string;
  nombres: string;
  apellidos: string;
  cod_especialidad: string;
  cod_departamento: string;
  sexo: string;
  telefono: string;
  correo: string;
  activo: string;
  horarios:  { dias_semana: string; entrada: string; salida: string }[];
  created_at?: string;
}

interface Specialty {
  id: string;
  nombre: string;
  descripcion: string;
  activo: string;
}

interface Departament {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  encargado: string;
  activo: string;
  created_at?: string;
}
interface DoctorsState {
  doctors: Doctor[];
  currentPatient: Doctor| null;
  loading: boolean;
  error: string | null;
  deleteStatus: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  addStatus: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  specialties: Specialty[];
  departments: Departament[];
  itemsPerPage: number;
  currentPage: number;
  searchTerm: string;
  modalOpen: boolean;
  updateSuccess: boolean | null;
}




const initialState: DoctorsState = {
  doctors: [],
  currentPatient:null,
  loading: false,
  error: null,
  deleteStatus: 'idle',
  addStatus: 'idle',
  specialties: [],
  departments: [],
  itemsPerPage: 10,
  currentPage: 1,
  searchTerm: '', 
  modalOpen: false,
  updateSuccess:false,
};

export const fetchDoctors = createAsyncThunk(
  'doctor/fetchDoctors',
  async ( ) => {
    const response = await axios.get(`${baseUrl}/doctor/buscardoctor`);
    console.log(response.data);
    
    return response.data;
  }
);

export const deleteDoctor = createAsyncThunk(
  'doctor/deleteDoctor',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.post(`${baseUrl}/doctor/eliminardoctor/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const addDoctor = createAsyncThunk<Doctor, Omit<Doctor, 'id'>, { rejectValue: string }>(
  'doctor/addDoctor',
  async (newDoctor: Omit<Doctor, 'id'>, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/doctor/agregardoctor`, newDoctor);
      if (response.data.action === 'success') {
        const newDoctorId = response.data.id;
        const horarios = newDoctor.horarios;
        const responseHorario = await axios.post(`${baseUrl}/doctor/agregarhorario`, {
          doctorId: newDoctorId,
          horarios: horarios,
        });
        if (responseHorario.data.action === 'success') {
          
          dispatch(fetchDoctors());
        return responseHorario.data;
      }
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.toString());
    }
  }
);


export const updateDoctor = createAsyncThunk(
  'doctor/updateDoctor',
  async (updatedDoctor: Doctor, { dispatch,rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/doctor/actualizardoctor/${updatedDoctor.id}`, updatedDoctor);
      dispatch(fetchDoctors());
      dispatch(fetchHorarios());
      return response.data;

    } catch (error: any) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);


export const loadDoctorid = createAsyncThunk(
  'doctor/loadDoctor',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/doctor/buscardoctor/${id}`);
      return response.data;

    } catch (error: any) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const loadDoctor = createAsyncThunk(
  'doctor/loadDoctor',
  async () => {
      const response = await axios.get(`${baseUrl}/doctor/buscardoctor`);
      console.log(response.data);
      return response.data;
  }
);


export const fetchSpecialties = createAsyncThunk(
  'doctor/fetchSpecialties',
  async () => {
    const response = await axios.get(`${baseUrl}/doctor/buscarespecialidad`);
    return response.data;
  }
);
export const fetchDepartment= createAsyncThunk(
  'doctor/fetchDepartment',
  async () => {
    const response = await axios.get(`${baseUrl}/departamento/buscardepartamento`);
    console.log(response.data);
    return response.data;
  }
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    toggleModal(state) {
      state.modalOpen = !state.modalOpen;
    },
    updateDoctorSuccess: (state) => {
      state.updateSuccess = true;
    },
    updateDoctorFailure: (state) => {
      state.updateSuccess = false;
    },
    resetUpdateSuccess: (state) => {
      state.updateSuccess = null;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action: PayloadAction<Doctor[]>) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteDoctor.fulfilled, (state, action: PayloadAction<string>) => {
        state.deleteStatus = 'fulfilled';
        state.doctors = state.doctors.filter((doctor) => doctor.id !== action.payload);
      })
      .addCase(deleteDoctor.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
        state.deleteStatus = 'rejected';
        state.error = action.error.message;
      })
      .addCase(addDoctor.pending, (state) => {
        state.addStatus = 'loading';
      })
      .addCase(addDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
        state.addStatus = 'fulfilled';
        state.doctors.push(action.payload);
      })
      .addCase(addDoctor.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
        state.addStatus = 'rejected';
        state.error = action.error.message;
      })
      .addCase(updateDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
        const index = state.doctors.findIndex((doctor) => doctor.id === action.payload.id);
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })
      .addCase(loadDoctor.fulfilled, (state, action: PayloadAction<Doctor[]>) => {
        state.doctors = action.payload;
      })
      .addCase(fetchSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialties.fulfilled, (state, action: PayloadAction<Specialty[]>) => {
        state.loading = false;
        state.specialties = action.payload;
      })
      .addCase(fetchSpecialties.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartment.fulfilled, (state, action: PayloadAction<Departament[]>) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartment.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});


export const { actions, reducer } = doctorsSlice;
export const {  setItemsPerPage,
  setCurrentPage,
  setSearchTerm, toggleModal, updateDoctorSuccess,  updateDoctorFailure, resetUpdateSuccess} = actions;
export default reducer;