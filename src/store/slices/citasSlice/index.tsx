import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import config from '../../../config';

const baseUrl = config.baseUrl;

interface Cita {
  id: number;
  cod_paciente: number | null;
  cod_doctor: number | null;
  cod_departamento: number | null;
  fecha: string | null;
  hora_inicio: string | null;
  hora_fin: string | null;
  activo: 'S' | 'N';
}

interface ResponseData {
  doctores: any[]; // Reemplaza 'any' con la estructura de tus objetos de doctores
  citas: Cita[];
  departamentos: any[]; // Reemplaza 'any' con la estructura de tus objetos de departamentos
}

interface CitasState {
  reservations: Cita[];
  loading: boolean;
  error: string | null;
  arrayDocHorCitas: ResponseData;
  itemsPerPage: number;
  currentPage: number;
  doctorColors: Record<string, string>;
}

const initialState: CitasState = {
  reservations: [],
  loading: false,
  error: null,
  arrayDocHorCitas: { doctores: [], citas: [], departamentos: [] },
  itemsPerPage: 10, // Ajusta este valor según tus necesidades
  currentPage: 1,
  doctorColors: {},
};

export const fetchReservations = createAsyncThunk(
  'citas/fetchReservations',
  async () => {
    const response = await axios.get(`${baseUrl}/citas/buscarcitas`);

    console.log(response.data.citas);

    return response.data.citas;
  }
);

export const deleteReservation = createAsyncThunk(
  'citas/deleteReservation',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/citas/eliminarcitas/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const addReservation = createAsyncThunk<Cita, Omit<Cita, 'id'>, { rejectValue: string }>(
  'citas/addReservation',
  async (newReservation: Omit<Cita, 'id'>, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/citas/agregarcitas`, newReservation);


      dispatch(fetchReservations());
      console.log(response.data);
      // Devolver la nueva cita
      return response.data

    } catch (error: any) {
      return rejectWithValue(error.toString());
    }
  }
);

const citasSlice = createSlice({
  name: 'citas',
  initialState,
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setDoctorColors: (state, action: PayloadAction<Record<string, string>>) => {
      state.doctorColors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReservations.fulfilled, (state, action: PayloadAction<Cita[]>) => {
      state.reservations = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchReservations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(deleteReservation.fulfilled, (state, action: PayloadAction<number>) => {
      state.reservations = state.reservations.filter(reservation => reservation.id !== action.payload);
    });
    builder.addCase(deleteReservation.rejected, (state, action) => {
      state.error = action.error.message || null;
    });
    builder.addCase(addReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addReservation.fulfilled, (state, action: PayloadAction<Cita>) => {
      state.reservations.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addReservation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { actions, reducer } = citasSlice;
export const { setItemsPerPage, setCurrentPage, setDoctorColors } = actions;
export default reducer;