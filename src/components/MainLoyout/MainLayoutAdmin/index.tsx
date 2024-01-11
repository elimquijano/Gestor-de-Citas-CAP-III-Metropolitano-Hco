import React, { useEffect } from "react";
import MainLayout from "..";
import {
  AiFillAppstore,
  AiFillCheckSquare,
  AiFillSetting,
  AiOutlineApartment,
  AiOutlineUser,
} from "react-icons/ai";
import { FaRegCalendarAlt, FaStethoscope, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { fetchReservations } from "../../../store/slices/citasSlice";
import { fetchDepartamentos } from "../../../store/slices/departamentoSlice";
import { fetchPatients } from "../../../store/slices/pacienteSlice";
import { fetchDoctors } from "../../../store/slices/doctorSlice";
import config from "../../../config";
const baseUrl = config.baseUrl;

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

const MainLayoutAdmin: React.FC<{
  navigationItems: any[];
  children?: React.ReactNode;
}> = ({ navigationItems, children }) => {
  const buttonsHeaderList = [
    {
      link: "/admin/perfil",
      icon: <AiOutlineUser />,
      text: "Perfil",
    },
    {
      link: "/admin/settings",
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
      links: [{ to: "/admin", text: "Home" }],
    },
    {
      key: "doctores",
      color: "bg-blue-400/70 text-white",
      icon: <FaStethoscope />,
      text: "Doctores",
      links: [
        { to: "/admin/doctores/agregar", text: "Añadir Doctor" },
        { to: "/admin/doctores/listar", text: "Listar Doctores" },
      ],
    },
    {
      key: "pacientes",
      color: "bg-blue-400/70 text-white",
      icon: <FaUser />,
      text: "Pacientes",
      links: [
        { to: "/admin/pacientes/agregar", text: "Añadir Paciente" },
        { to: "/admin/pacientes/listar", text: "Listar Pacientes" },
      ],
    },
    {
      key: "departamentos",
      color: "bg-blue-400/70 text-white",
      icon: <AiOutlineApartment />,
      text: "Departamentos",
      links: [
        { to: "/admin/departamentos/agregar", text: "Añadir Departamento" },
        { to: "/admin/departamentos/listar", text: "Listar Departamentos" },
      ],
    },
    {
      key: "citas",
      color: "bg-blue-400/70 text-white",
      icon: <AiFillCheckSquare />,
      text: "Citas médicas",
      links: [
        { to: "/admin/citas/agregar", text: "Añadir Cita" },
        { to: "/admin/citas/listar", text: "Listar Citas" },
      ],
    },
  ];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDepartamentos());
    dispatch(fetchPatients());
    dispatch(fetchDoctors());
    dispatch(fetchReservations());
  }, [dispatch]);
  const reservations = useAppSelector((state) => state.citasSlice.reservations);
  const pacientes = useAppSelector((state) => state.pacienteSlice.patients);
  const mapReservations = (reservations: any[]) => {
    return reservations.map((reservation) => {
      const paciente = pacientes.find((p) => p.id === reservation.cod_paciente);

      return {
        imagen_paciente: paciente
          ? `${baseUrl}/storage/${paciente.imagen}`
          : "",
        nombre_paciente: paciente
          ? `${paciente.nombres} ${paciente.apellido_paterno}`
          : "",
        fecha_registro: "Hace 1 hora",
        estado: reservation.activo === "S" ? "PENDIENTE" : "ATENDIDO",
      };
    });
  };

  const citas = mapReservations(reservations);
  
  const identifyUser = {
    id: 1,
    type: "Administrador",
    linkPerfil: "/admin/perfil",
  };

  return (
    <MainLayout
      buttonsHeaderList={buttonsHeaderList}
      buttonsSidebarList={buttonsSidebarList}
      citas={citas}
      identifyUser={identifyUser}
      navigationItems={navigationItems}
      children={children}
      directAccess={
        <Link
          to={"/admin/citas/agregar"}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaRegCalendarAlt className="text-2xl" />
          <label className="cursor-pointer">Apuntar Cita</label>
        </Link>
      }
    />
  );
};

export default MainLayoutAdmin;
