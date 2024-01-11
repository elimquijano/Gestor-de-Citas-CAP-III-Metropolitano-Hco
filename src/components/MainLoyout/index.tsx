import { AiFillBell, AiOutlinePoweroff } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  setOpenButton,
  toggleNotifications,
  toggleProfile,
  toogleSidebar,
} from "../../store/slices/mainLayoutSlice";
import { useSelector } from "react-redux";

import ModalConfirm from "../Modal/ModalConfirm";
import NavegacionPaginas from "../Navegacion/NavegacionPaginas";
import { RootState } from "../../store";
import essaludIcon from "../../assets/LoginImg/logo-essalud.png";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { fetchPatients } from "../../store/slices/pacienteSlice";
import config from "../../config";
const baseUrl = config.baseUrl;

// Componente button sidebar
const ButtonSidebar: React.FC<{
  button: {
    key: string;
    color: string;
    icon: JSX.Element;
    text: string;
    links: { to: string; text: string }[];
  };
  openButton: string | null;
  handleButtonClick: (key: string) => void;
}> = ({ button, openButton, handleButtonClick }) => (
  <>
    <Link to={button.links.length > 1 ? "#" : button.links[0].to}>
      <button
        className={`w-full flex py-3 px-6 text-left justify-between items-center ${
          openButton === button.key ? button.color : ""
        }`}
        onClick={() => handleButtonClick(button.key)}
      >
        <div className="flex gap-4 items-center justify-center pr-10">
          {button.icon}
          {button.text}
        </div>
        {button.links.length > 1 &&
          (openButton === button.key ? <FiChevronUp /> : <FiChevronDown />)}
      </button>
    </Link>
    {openButton === button.key && button.links.length > 1 && (
      <div className="text-center">
        {button.links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex w-full px-8 py-2 bg-white text-gray-600 hover:text-[#009EFB]"
          >
            {link.text}
          </Link>
        ))}
      </div>
    )}
  </>
);

// MAIN LAYOUT COMPONENT
/* 
@buttonsSidebarList{
  descripcion: botones del sidebar
  formato de parametro: [
    {
      link: string,
      icon: react-icons object,
      text: string,
    },
  ]
}

@buttonsHeaderList{
  descripcion: botones desplegables al hacer click en el perfil
  formato de parametro: [
    {
      key: string,
      color: string,
      icon: react-icons object,
      text: string,
      links: [{ to: string, text: string },],
    },
  ]
}

@citas{
  descripcion: datos para las notificaciones en la parte del header
  formato de parametro: [
    {
      image_paciente: string,
      nombre_paciente: string,
      fecha_registro: string,
      estado: string,
    },
  ]
}

@identifyUser{
  descripcion: datos del usuario
  formato de parametro: {
    id: string,
    type: string,
    linkPerfil: string,
  }
}
*/

const MainLayout: React.FC<{
  buttonsSidebarList: any[];
  buttonsHeaderList: any[];
  navigationItems: any[];
  citas: any[];
  identifyUser: { id: number; type: string; linkPerfil: string };
  directAccess?: React.ReactNode;
  children?: React.ReactNode;
}> = ({
  buttonsSidebarList,
  buttonsHeaderList,
  navigationItems,
  citas,
  identifyUser,
  directAccess = <></>,
  children,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const patients = useAppSelector((state) => state.pacienteSlice.patients);
  const defineUser = () => {
    if (identifyUser.type === "Administrador") {
      return useAppSelector((state) => state.adminSlice.admin);
    } else {
      const patient = patients.find(
        (elemento) => Number(elemento.id) === identifyUser.id
      );
      if (patient !== undefined) {
        return patient;
      } else {
        return {
          nombres: "",
          apellido_paterno: "",
          imagen: "",
        };
      }
    }
  };

  let user = defineUser();

  // controladores de evento
  // sidebar
  const sidebar = useAppSelector((state) => state.mainLayout.isShowSidebar);
  const openButton = useAppSelector((state) => state.mainLayout.openButton);
  const handleButtonClick = (buttonName: string) => {
    if (openButton === buttonName) {
      dispatch(setOpenButton(null)); // Cierra el botón si ya está abierto
    } else {
      dispatch(setOpenButton(buttonName)); // Abre el botón
    }
  };
  // header
  const [mostrarBtn, setMostrarBtn] = useState(true);
  const toggleSidebarButton = () => {
    dispatch(toogleSidebar());
    setMostrarBtn(!mostrarBtn);
  };
  const isNotificationsOpen = useSelector(
    (state: RootState) => state.mainLayout.isOpenNotifications
  );
  const isProfileOpen = useSelector(
    (state: RootState) => state.mainLayout.isOpenProfile
  );
  const pendientes = citas.filter((cita) => cita.estado === "PENDIENTE").length;
  const navigate = useNavigate();
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const logout = () => {
    // Elimina el access_token del localStorage
    /* localStorage.removeItem("id_token");
    localStorage.removeItem("type_token"); */

    // Redirige al usuario a la página de inicio de sesión
    navigate("/auth");
  };

  return (
    <div className={`wrapper ${sidebar ? "activo" : ""} h-screen w-screen`}>
      <aside className="bg-[#161a1d] text-white flex flex-col overflow-y-auto">
        {/* imagen EsSalud */}
        <Link to={"#"} className="mt-4">
          <img src={essaludIcon} alt="" className="h-10 mx-auto" />
        </Link>

        {/* perfil */}
        <Link
          to={identifyUser.linkPerfil}
          className="flex flex-col items-center pt-14 pb-10"
        >
          <div className="text-center">
            <div className="w-28 h-28 border-4 rounded-full border-white overflow-hidden">
              <img
                src={`${baseUrl}/storage/${user.imagen}`}
                alt={user.nombres + " " + user.apellido_paterno}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 font-medium">
              {user.nombres + " " + user.apellido_paterno}
            </p>
            <span className="text-slate-300 text-sm">{identifyUser.type}</span>
          </div>
        </Link>

        {/* botones sidebar */}
        <ul className="text-start">
          {buttonsSidebarList.map((button) => (
            <ButtonSidebar
              key={button.key}
              openButton={openButton}
              handleButtonClick={handleButtonClick}
              button={button}
            />
          ))}
        </ul>
      </aside>
      <div className="grid grid-rows-[auto,1fr] overflow-y-auto">
        <header className="bg-primary text-white flex justify-between p-3">
          {/* button sidebar open/close */}
          <button onClick={() => toggleSidebarButton()}>
            <div
              className={`${
                mostrarBtn ? "menu-burger" : ""
              } flex flex-col gap-1`}
            >
              <div className="uno"></div>
              <div className="dos"></div>
              <div className="tres"></div>
            </div>
          </button>

          {/* buttons direct access */}
          <div className="flex items-center gap-8">
            {/* buttons of direct access from user */}
            {directAccess}

            {/* button notifications */}
            <div>
              <button
                className="relative"
                onClick={() => dispatch(toggleNotifications())}
              >
                <AiFillBell className="text-2xl" />
                <div className="bg-danger rounded-full absolute -top-2 -right-2  text-xs w-5 h-5 flex justify-center items-center">
                  {pendientes}
                </div>
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-2 bg-white text-black shadow-xl rounded p-2 flex flex-col gap-2 w-64 md:w-96 h-96 overflow-y-auto">
                  <h4 className="text-xl">
                    <strong>Notificaciones</strong>
                  </h4>
                  <ul className="flex flex-col text-sm">
                    {citas.map((cita, index) => (
                      <Link key={index} to={"/admin/citas/listar"}>
                        <div
                          className={`flex gap-2 ${
                            cita.estado === "PENDIENTE"
                              ? "bg-[#eaeaea]"
                              : "bg-[#ffffff]"
                          } rounded p-1`}
                        >
                          <img
                            src={cita.imagen_paciente}
                            alt={cita.nombre_paciente}
                            className="w-12 h-12 rounded-full cursor-pointer border-2"
                          />
                          <div className="flex flex-col gap-2">
                            <p>
                              Tienes una nueva cita pendiente de{" "}
                              <strong>{cita.nombre_paciente}</strong>
                            </p>
                            <p className="text-xs text-[#009EFB]">
                              {cita.fecha_registro}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* button profile */}
            <div>
              <button onClick={() => dispatch(toggleProfile())}>
                <img
                  src={`${baseUrl}/storage/${user.imagen}`}
                  alt="Foto de perfil"
                  className="w-10 h-10 rounded-full cursor-pointer border-2"
                />
              </button>
              {isProfileOpen && (
                <div className="absolute right-2 bg-white text-black shadow-xl w-48 rounded">
                  <ul className="text-xs">
                    {buttonsHeaderList.map((button, index) => (
                      <Link to={button.link} key={index}>
                        <li className="px-4 py-2 ">
                          <button className="flex gap-2 items-center hover:text-[#009EFB]">
                            {button.icon}
                            {button.text}
                          </button>
                        </li>
                      </Link>
                    ))}
                    <li className="px-4 py-2 ">
                      <button
                        className="flex gap-2 items-center hover:text-[#009EFB]"
                        onClick={() => {
                          setIsShowModalConfirm(true);
                        }}
                      >
                        <AiOutlinePoweroff />
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="p-6 bg-white overflow-auto">
          <NavegacionPaginas items={navigationItems} />
          <div className="border-2 font-sans text-sm shadow-lg rounded-lg p-3">
            {children}
          </div>
        </main>
      </div>
      <ModalConfirm
        message="¿Estás seguro de cerrar sesión?"
        onClick={logout}
        isShowModalConfirm={isShowModalConfirm}
        setIsShowModalConfirm={setIsShowModalConfirm}
      />
    </div>
  );
};

export default MainLayout;
