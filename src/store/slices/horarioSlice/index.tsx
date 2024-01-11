import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import config from '../../../config'
// Antes de hacer la petición con axios, define la URL base
const baseUrl = config.baseUrl;

interface Horario {
  id: string;
  cod_doctor: string;
  dias_semana: string;
  entrada: string;
  salida: string;
  activo:string;
  registration_date: string;
}

interface HorarioState {
  horarios: Horario[];
  itemsPerPage: number;
  currentPage: number;
  searchTerm: string;
  loading: boolean;
  error: string | null; // Nuevo estado para el término de búsqueda
}
const response = await axios.get(`${baseUrl}/doctor/buscarhorarios`);
const data: Horario[] = response.data;

const sampleHorario: Horario[] = data.map((horario) => ({
  ...horario,
  activo: horario.activo === 'S' ? 'Activo' : 'No Activo',
}));
const initialState: HorarioState = {
  horarios: sampleHorario, // Aquí debes cargar tus datos de horarios
  itemsPerPage: 10,
  currentPage: 1,
  searchTerm: "",
  loading: false,
  error: null,
   // Nuevo estado para el término de búsqueda
};
export const fetchHorarios = createAsyncThunk(
  'horario/fetchHorarios',
  async () => {
    const response = await axios.get(`${baseUrl}/doctor/buscarhorarios`);
    return response.data;
  }
);

const horarioSlice = createSlice({
  name: "horarios",
  initialState,
  reducers: {
    addHorario: (state, action) => {
      state.horarios.push(action.payload);
    },

    updateHorario: (state, action) => {
      const { id, data } = action.payload;
      const horarioIndex = state.horarios.findIndex((doctor) => doctor.id === id);
      if (horarioIndex !== -1) {
        state.horarios[horarioIndex] = { ...state.horarios[horarioIndex], ...data };
      }
      
    },
    deleteHorario: (state, action) => {
      const id = action.payload;
      state.horarios = state.horarios.filter((horario) => horario.id !== id);
      
    },
    loadHorarios: (state, action) => {
      state.horarios = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload; // Actualiza el término de búsqueda
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchHorarios.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchHorarios.fulfilled, (state, action: PayloadAction<Horario[]>) => {
      state.loading = false;
      state.horarios = action.payload;
    })
    .addCase(fetchHorarios.rejected, (state, action: PayloadAction<unknown, string, unknown, any>) => {
      state.loading = false;
      state.error = action.error.message;
    }) 
  }
});

export const {
  addHorario,
  updateHorario,
  deleteHorario,
  setItemsPerPage,
  setCurrentPage,
  setSearchTerm,
  loadHorarios,
} = horarioSlice.actions;
export default horarioSlice.reducer;
