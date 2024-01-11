import { createSlice } from "@reduxjs/toolkit";

interface User {
    user: number;
    password: string;
    // Otras propiedades del usuario
  }
  
  interface UserState {
    user: User | null;
  }
  
  const initialState: UserState = {
    user: null,
  };
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      loginUser: (state, action) => {
        state.user = action.payload;
      },
      logoutUser: (state) => {
        state.user = null;
      },
    },
  });

  
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;