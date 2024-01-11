import {
  AiFillAppstore,
  AiFillCheckSquare,
  AiFillSetting,
  AiOutlineApartment,
  AiOutlineUser,
} from "react-icons/ai";

import { FaStethoscope } from "react-icons/fa";
import MainLayout from "..";
import React from "react";

// MAIN LAYOUT ADMIN
/*
@navigationItems{
  descripcion: links de navegacion que van en la parte superior de las vistas(hijo del main)
  formato de parametro: [
    {
      link: string,
      icon: react-icons object,
      text: string,
    },
  ]
}
} */

const MainLayoutPatient: React.FC<{
  navigationItems: any[];
  children?: React.ReactNode;
}> = ({ navigationItems, children }) => {
  const buttonsHeaderList = [
    {
      link: "/dashboard/user/perfil",
      icon: <AiOutlineUser />,
      text: "Perfil",
    },
    {
      link: "/dashboard/user/settings",
      icon: <AiFillSetting />,
      text: "Configuración",
    },
  ];
  const buttonsSidebarList = [
    {
      key: "home",
      color: "bg-blue-400/70 text-white",
      icon: <AiFillAppstore />,
      text: "Home",
      links: [{ to: "/dashboard/user", text: "Home" }],
    },
    {
      key: "citas",
      color: "bg-blue-400/70 text-white",
      icon: <AiFillCheckSquare />,
      text: "Citas médicas",
      links: [
        { to: "/dashboard/user/citas/agregar", text: "Añadir Cita" },
        { to: "/dashboard/user/citas", text: "Mis Citas" },
      ],
    },
    {
      key: "doctores",
      color: "bg-blue-400/70 text-white",
      icon: <FaStethoscope />,
      text: "Doctores",
      links: [
        { to: "/dashboard/user/doctores", text: "Doctores" },
      ],
    },
    {
      key: "departamentos",
      color: "bg-blue-400/70 text-white",
      icon: <AiOutlineApartment />,
      text: "Departamentos",
      links: [
        { to: "/dashboard/user/departamentos", text: "Departamentos" },
      ],
    },
  ];
  const citas = [
    {
      image_paciente:
        "https://clinicadelriohortega.es/wp-content/uploads/2021/05/reconocimientos-medicos-01-800x800.jpg.webp",
      nombre_paciente: "Pablo Neruda",
      fecha_registro: "Hace 1 hora",
      estado: "PENDIENTE",
    },
    {
      image_paciente:
        "https://clinicadelriohortega.es/wp-content/uploads/2021/05/reconocimientos-medicos-01-800x800.jpg.webp",
      nombre_paciente: "Nicol Garder",
      fecha_registro: "Hace 1 hora",
      estado: "ATENDIDO",
    },
  ];
  const identifyUser = {
    id: 1,  //  aqui recuperar id de usuario logeado
    type: "Usuario",
    linkPerfil: "/dashboard/user/perfil",
  };

  return (
    <MainLayout
      buttonsHeaderList={buttonsHeaderList}
      buttonsSidebarList={buttonsSidebarList}
      citas={citas}
      identifyUser={identifyUser}
      navigationItems={navigationItems}
      children={children}
    />
  );
};

export default MainLayoutPatient;
