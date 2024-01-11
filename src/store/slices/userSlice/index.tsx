import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const samplePatients: Patient[] = [
//   {
//     id: "1",
//     dni: "12345678",
//     name: "Juan",
//     lastname: "Pérez",
//     phone: "123456789",
//     sex: "Masculino",
//     password: "contraseña123",
//     civil_status: "Soltero",
//     registration_date: "2023-03-10",
//     address: "Calle Principal 123",
//     birthdate: "1980-05-15",
//     image:
//       "https://toppng.com/public/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png",
//     blood_group: "A+",
//     email: "user@gmail.com",
//     status: "Activo",
//     retirement_date: "2023-12-31",
//   },
// ];

interface User{
  id: string;
  numero_documento: string;
  nombres: string;
  correo: string;
  telefono: string;
  password: string;
}

interface UserState {
  users: User[];
  currentPatient: User[] | null;
  itemsPerPage: number;
  currentPage: number;
  searchTerm: string; // Nuevo estado para el término de búsqueda
}


const initialState: UserState = {
  users: [], // Aquí debes cargar tus datos de pacientes
  currentPatient: null,
  itemsPerPage: 10,
  currentPage: 1,
  searchTerm: "", // Nuevo estado para el término de búsqueda
};

// export const updatePatientsList = (newPatientsList: any) => ({
//   type: 'UPDATE_PATIENTS_LIST',
//   payload: newPatientsList,
// });

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    addUser: (state, action) => {
    //   const { data } = action.payload;
   
    // //   const user=axios.post('http://127.0.0.1:8000/pacientes/agregarpaciente', data);
      
    },
    updateUser: (state, action) => {
    //   const { id, data } = action.payload;
    //   const patientIndex = state.patients.findIndex((patient) => patient.id === id);

    //   if (patientIndex !== -1) {
    //     state.patients[patientIndex] = { ...state.patients[patientIndex],...data, };
    //   }
    //     axios.post(`http://127.0.0.1:8000/pacientes/actualizarpaciente/${id}`, data)
    //     .then(() => {
    //     })
    //     .catch((error) => {
    //       console.error('Error al actualizar la imagen del paciente:', error);
    //       // Manejar el error según sea necesario
    //     });    
        },
    deleteUser: (state, action) => {
    //   const id = action.payload;
    //   const patientIndex = state.patients.findIndex(
    //     (patient) => patient.id === id
    //   );
    //   if (patientIndex !== -1) {

    //     axios.post(`http://127.0.0.1:8000/pacientes/eliminarpaciente/${id}`)
    //     .then(() => {    
    //     })
    //     .catch((error) => {
    //       console.error('Error al eliminar el doctor', error);
    //       // Manejar el error según sea necesario
    //     });

    //     state.patients.splice(patientIndex, 1);
    //   }
    },
    loadUser: (state, action) => {
        // const newPatientsData = action.payload.data;
        // // Actualiza el estado de los pacientes con los nuevos datos
        // state.patients = newPatientsData;
  
    },
    setCurrentUser: (state, action) => {
      state.currentPatient = action.payload;
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
    // Puedes agregar más reducers aquí si necesitas más funcionalidades
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  setCurrentUser,
  setItemsPerPage,
  setCurrentPage,
  setSearchTerm,
  loadUser,
} = patientSlice.actions;

export default patientSlice.reducer;
