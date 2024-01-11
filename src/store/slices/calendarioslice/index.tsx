// calendarSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewType: 'month', // Inicialmente se muestra la vista de mes
};


const calendarioSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeView: (state, action) => {
      state.viewType = action.payload;
    },
  },
});

export const { changeView } = calendarioSlice.actions;

export default calendarioSlice.reducer;