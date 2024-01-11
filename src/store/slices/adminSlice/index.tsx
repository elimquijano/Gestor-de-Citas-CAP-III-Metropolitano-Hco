import { createSlice } from "@reduxjs/toolkit";

const sampleAdmin: Admin = {
  id: "1",
  nombres: "Lionel",
  apellido_paterno: "Messi",
  type: "Administrador",
  email: "juan.perez@example.com",
  password: "user1234",
  registration_date: "2022-03-10",
  imagen:
    "imagen_6560345c8bf95.png",
};

interface Admin {
  id: string;
  nombres: string;
  apellido_paterno: string;
  type: string;
  email: string;
  password: string;
  registration_date: string;
  imagen: string;
}

interface AdminState {
  admin: Admin;
}

const initialState: AdminState = {
  admin: sampleAdmin, // Aquí debes cargar tus datos del admin
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const {updateAdmin} = adminSlice.actions;
export default adminSlice.reducer;
