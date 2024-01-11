import { configureStore} from "@reduxjs/toolkit";
import mainLayout from "./slices/mainLayoutSlice";
import doctorSlice from "./slices/doctorSlice";
import horarioSlice from "./slices/horarioSlice";
import departamentoSlice from "./slices/departamentoSlice";
import pacienteSlice from "./slices/pacienteSlice";
import calendarioslice from "./slices/calendarioslice";
import citasSlice from "./slices/citasSlice";
import adminSlice from "./slices/adminSlice";


const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    mainLayout,
    doctorSlice,
    horarioSlice,
    departamentoSlice,
    pacienteSlice,
    calendarioslice,
    citasSlice,
    adminSlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: true,
    immutableCheck: false,
    serializableCheck: false,
  }),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
