import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import config from '../../../config';

const baseUrl = config.baseUrl;

interface Patient {
  id: string;
  numero_documento: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  sexo: string;
  password: string;
  estado_civil: string;
  direccion: string;
  fecha_nacimiento: string;
  imagen: string;
  grupo_sangre: string;
  correo: string;
  activo: string;
  fecha_retiro?: string;
}


interface PatientState {
  patients: Patient[];
  currentPatient: Patient | null;
  loading: boolean;
  error: string | null;
  deleteStatus: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  addStatus: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  itemsPerPage: number;
  currentPage: number;
  modalOpen: boolean;
  updateSuccess: boolean | null;
}

const initialState: PatientState = {
  patients: [],
  currentPatient: null,
  loading: false,
  error: null,
  deleteStatus: 'idle',
  addStatus: 'idle',
  itemsPerPage: 10,
  currentPage: 1,
  modalOpen: false,
  updateSuccess:false,
};


export const fetchPatients = createAsyncThunk(
  'patient/fetchPatients',
  async () => {
    const response = await axios.get(`${baseUrl}/pacientes/buscarpacientes`);
    return response.data;
  }
);

export const deletePatient = createAsyncThunk(
  'patient/deletePatient',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.post(`${baseUrl}/pacientes/eliminarpaciente/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const addPatient = createAsyncThunk<Patient, Omit<Patient, 'id'>, { rejectValue: string }>(
  'patient/addPatient',
  async (newPatient: Omit<Patient, 'id'>, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/pacientes/agregarpaciente`, newPatient);
      if (response.data.action === 'success') {
        
        dispatch(fetchPatients());
        console.log(response.data.patient);
        
        return response.data.patient;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.toString());
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patient/updatePatient',
  async (updatedPatient: Patient, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/pacientes/actualizarpaciente/${updatedPatient.id}`, updatedPatient);
      console.log(response);
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const loadPatients = createAsyncThunk(
  'paciente/loadPatients',
  async () => {
    const response = await axios.get(`${baseUrl}/pacientes/buscarpacientes`);
    return response.data;
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleteStatus = 'idle';
      state.addStatus = 'idle';
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    toggleModal(state) {
      state.modalOpen = !state.modalOpen;
    },
    updatePatientSuccess: (state) => {
      state.updateSuccess = true;
    },
    updatePatientFailure: (state) => {
      state.updateSuccess = false;
    },
    resetUpdateSuccess: (state) => {
      state.updateSuccess = null;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPatients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(deletePatient.pending, (state) => {
      state.deleteStatus = 'loading';
    });
    builder.addCase(deletePatient.fulfilled, (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter(patient => patient.id !== action.payload);
      state.deleteStatus = 'fulfilled';
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.deleteStatus = 'rejected';
      state.error = action.error.message || null;
    });
    builder.addCase(addPatient.pending, (state) => {
      state.addStatus = 'loading';
    });
    builder.addCase(addPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload);
      state.addStatus = 'fulfilled';
    });
    builder.addCase(addPatient.rejected, (state, action) => {
      state.addStatus = 'rejected';
      state.error = action.error.message || null;
    });
    builder.addCase(updatePatient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex(patient => patient.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updatePatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(loadPatients.fulfilled, (state, action) => {
      state.patients = action.payload;
    });
 
  },
});



export const { actions, reducer } = patientSlice;
export const { resetDeleteStatus,setCurrentPage,setItemsPerPage,toggleModal,updatePatientSuccess, updatePatientFailure, resetUpdateSuccess } = actions;
export default reducer;