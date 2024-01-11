import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AdminHome from "./views/interfaz-admin/Home"
import AgregarCita from "./views/interfaz-user/AgregarCitas"
import AgregarCitas from "./views/interfaz-admin/AgregarCitas"
import AgregarDepartamentos from "./views/interfaz-admin/AgregarDepartamentos"
import AgregarDoctores from "./views/interfaz-admin/AgregarDoctores"
import AgregarPacientes from "./views/interfaz-admin/AgregarPacientes"
import ListarDepartamentos from "./views/interfaz-admin/ListarDepartamentos"
import ListarDoctores from "./views/interfaz-admin/ListarDoctores"
import ListarPacientes from "./views/interfaz-admin/ListarPacientes"
import Login from "./views/Auth/Login"
import Page404 from './views/Page404'
import Perfil from "./views/interfaz-admin/Perfil"
import PerfilUser from "./views/interfaz-user/Perfil"
import { Provider } from "react-redux"
import Signup from "./views/Auth/Signup"
import UserHome from "./views/interfaz-user/Home"
import VerDepartamento from "./views/interfaz-admin/VerDepartamento"
import VerDepartamentos from "./views/interfaz-user/VerDepartamentos"
import VerDoctores from "./views/interfaz-user/VerDoctores"
import store from "./store"
import ListarCitas from './views/interfaz-admin/ListarCitas'
import VerCitas from './views/interfaz-user/VerCitas'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>

            {/* ROUTES PACIENTE */}
            <Route index element={<Navigate to="/auth" />} Component={Login} />
            <Route path="/auth/signup" Component={Signup} />
            <Route path="/dashboard/user" Component={UserHome} />
            <Route path="/dashboard/user/citas" Component={VerCitas} />
            <Route path="/dashboard/user/citas/agregar" Component={AgregarCita} />
            <Route path="/dashboard/user/doctores" Component={VerDoctores} />
            <Route path="/dashboard/user/departamentos" Component={VerDepartamentos} />
            <Route path="/dashboard/user/perfil" Component={PerfilUser} />

            {/* ROUTES ADMIN */}
            <Route path="/admin" Component={AdminHome} />
            <Route path="/admin/doctores/agregar" Component={AgregarDoctores} />
            <Route path="/admin/doctores/listar" Component={ListarDoctores} />
            <Route path="/admin/pacientes/agregar" Component={AgregarPacientes} />
            <Route path="/admin/pacientes/listar" Component={ListarPacientes} />
            <Route path="/admin/departamentos/:id" Component={VerDepartamento} />
            <Route path="/admin/departamentos/agregar" Component={AgregarDepartamentos} />
            <Route path="/admin/departamentos/listar" Component={ListarDepartamentos} />
            <Route path="/admin/perfil" Component={Perfil} />
            <Route path="/admin/citas/agregar" Component={AgregarCitas} />
            <Route path="/admin/citas/Listar" Component={ListarCitas} />
            {/* 404 */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
