import { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";

import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import ItemsPerPageSelector from "../../../components/Tablas/components/ItemsPerPageSelector";
import SearchInput from "../../../components/Tablas/components/SearchInput";
import Table from "../../../components/Tablas/Table";
import Pagination from "../../../components/Tablas/components/Pagination";
import ModalSucces from "../../../components/Modal/ModalSuccess";
import ModalError from "../../../components/Modal/ModalError";
import ModalConfirm from "../../../components/Modal/ModalConfirm";
import InputsFormPaciente from "../../../components/Formularios/Paciente/InputsFormPaciente";
import ButtonForm from "../../../components/Botones/ButtonForm";
import ModalCenter from "../../../components/Modal/ModalCenter";
import { toggleModal } from "../../../store/slices/mainLayoutSlice";
import {
  loadPatients,
  deletePatient,
  updatePatient,
  setCurrentPage,
  setItemsPerPage,
  updatePatientSuccess,
  resetUpdateSuccess,
  updatePatientFailure,
} from "../../../store/slices/pacienteSlice";

import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";

const ListarPacientes = () => {
  const navigationItems = [
    { to: "/", text: "Home", icon: <AiFillAppstore /> },
    { to: "/admin/pacientes/listar", text: "Pacientes" },
  ];

  const dispatch = useAppDispatch();
  const patients = useAppSelector(
    (state: RootState) => state.pacienteSlice.patients
  );
  const itemsPerPage = useAppSelector(
    (state: RootState) => state.pacienteSlice.itemsPerPage
  );
  const currentPage = useAppSelector(
    (state: RootState) => state.pacienteSlice.currentPage
  );
  const updateSuccess = useAppSelector(
    (state: RootState) => state.pacienteSlice.updateSuccess
  );

  useEffect(() => {
    dispatch(loadPatients());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredPatients = patients.filter((patient) =>
    patient.nombres.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  const columns = [
    {
      property: "imagen",
      label: "Imagen",
      transform: (value: string) => {
        if (typeof value === "string") {
          const numericOnly = value.replace(/\D/g, "");
          return <span>{numericOnly.substring(0, 10)}</span>;
        }
        return value;
      },
    },
    { property: "nombres", label: "Nombre" },
    { property: "apellido_paterno", label: "Apellido Paterno" },
    { property: "apellido_materno", label: "Apellido Materno" },
    { property: "numero_documento", label: "DNI" },
    { property: "telefono", label: "Teléfono" },
    { property: "sexo", label: "Sexo" },
    {
      property: "estado_civil",
      label: "Estado Civil",
      transform: (value: any) => {
        switch (value) {
          case "0":
            return "Soltero";
          case "1":
            return "Casado";
          case "2":
            return "Viudo";
          case "3":
            return "Divorciado";
          default:
            return "Desconocido";
        }
      },
    },
    { property: "created_at", label: "Fecha de Registro" },
    { property: "direccion", label: "Dirección" },
    { property: "fecha_nacimiento", label: "Fecha de nacimiento" },
    {
      property: "grupo_sangre",
      label: "Grupo Sanguineo",
      transform: (value: any) => {
        switch (value) {
          case "0":
            return "O+";
          case "1":
            return "O-";
          case "2":
            return "A+";
          case "3":
            return "A-";
          case "4":
            return "B+";
          case "5":
            return "B-";
          case "6":
            return "AB+";
          case "7":
            return "AB-";
          default:
            return "Desconocido";
        }
      },
    },
    {
      property: "fecha_retiro",
      label: "Fecha de Retiro",
      transform: (value: null | undefined) => {
        if (value === null || value === undefined || value === "S") {
          return "No se ha retirado";
        }
        return value;
      },
    },
    {
      property: "activo",
      label: "Estado",
      transform: (value: string) => {
        if (value === "S") {
          return "Activo";
        }
        return "Inactivo";
      },
    },
  ];

  const deleteItem = (id: string) => {
    dispatch(deletePatient(id));
    setIsShowModalConfirm(false);
    setModalMessage("Se eliminó exitosamente!");
    setIsShowModalSuccess(true);
  };
  type Patient = {
    id?: string;
    numero_documento: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    sexo: string;
    password: string;
    estado_civil: {
      id: string;
      nombre: string;
    };
    direccion: string;
    fecha_nacimiento: string;
    imagen: string;
    grupo_sangre: {
      id: string;
      nombre: string;
    };
    correo: string;
    activo: string;
    confirm_password: string;
  };
  const [idPatient, setIdPatient] = useState<string | null>(null);

  const [formData, setFormData] = useState<Patient>({
    id: "",
    numero_documento: "",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    sexo: "",
    password: "",
    estado_civil: {
      id: "",
      nombre: "",
    },
    direccion: "",
    fecha_nacimiento: "",
    imagen: "",
    grupo_sangre: {
      id: "",
      nombre: "",
    },
    correo: "",
    activo: "",
    confirm_password: "",
  });
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (updateSuccess) {
      setIsShowModalSuccess(true);
      dispatch(loadPatients());
      dispatch(resetUpdateSuccess());
    }
  }, [updateSuccess, dispatch]);

  const handleSubmit = () => {
    if (!formData.id) {
      console.error("formData.id es undefined");
      return;
    }

    const patientToUpdate = {
      ...formData,
      id: formData.id,
      estado_civil: formData.estado_civil.id,
      grupo_sangre: formData.grupo_sangre.id,
      activo: formData.activo === "Inactivo" ? "" : "S",
      fecha_retiro:
        formData.activo === "Inactivo"
          ? new Date().toISOString().slice(0, 10)
          : "",
    };

    console.log(patientToUpdate);

    dispatch(updatePatient(patientToUpdate)).then((action: any) => {
      if (action.payload) {
        dispatch(updatePatientSuccess());
        setModalMessage("Actualización exitosa!");
        setIsShowModalSuccess(true);
        toggleVisibility(); // Cierra el ModalCenter
      } else {
        dispatch(updatePatientFailure());
        setModalMessage("Error en la actualización.");
        setIsShowModalError(true);
        toggleVisibility(); // Cierra el ModalCenter
      }
    });
  };

  const toggleVisibility = () => {
    dispatch(toggleModal());
  };

  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);

  return (
    <MainLayoutAdmin
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces
            title="LISTA DE PACIENTES"
            linkTo="/admin/pacientes/agregar"
            linkText="Agregar Paciente"
          />
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <ItemsPerPageSelector
                itemsPerPageRedux={itemsPerPage}
                onChange={(newValue) => dispatch(setItemsPerPage(newValue))}
              />
              <SearchInput
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
              />
            </div>

            <Table
              columns={columns}
              data={paginatedPatients}
              onEditClick={(item) => {
                setIdPatient(item.id);
                setFormData({
                  id: item.id,
                  numero_documento: item.numero_documento || "",
                  nombres: item.nombres || "",
                  apellido_paterno: item.apellido_paterno || "",
                  apellido_materno: item.apellido_materno || "",
                  telefono: item.telefono || "",
                  sexo: item.sexo || "",
                  password: item.password || "",
                  estado_civil: {
                    id: item.estado_civil || "",
                    nombre: item.estado_civil?.nombre || "",
                  },
                  direccion: item.direccion || "",
                  fecha_nacimiento: item.fecha_nacimiento || "",
                  imagen: item.imagen || "",
                  grupo_sangre: {
                    id: item.grupo_sangre || "",
                    nombre: item.grupo_sangre?.nombre || "",
                  },
                  correo: item.correo || "",
                  activo: item.activo === "S" ? "Activo" : "NoActivo",
                  confirm_password: item.password || "",
                });
                toggleVisibility();
              }}
              onDeleteClick={(item) => {
                setIdPatient(item.id);
                setIsShowModalConfirm(true);
              }}
            />

            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredPatients.length}
              onPageChange={(newPage) => dispatch(setCurrentPage(newPage))}
            />
          </div>
          <ModalCenter
            modalChildren={
              <>
                <form
                  className="p-4 grid grid-cols-2 gap-8"
                  encType="multipart/form-data"
                >
                  <InputsFormPaciente
                    formData={formData}
                    setFormData={setFormData}
                  />

                  <div className="flex gap-2 col-span-2 justify-end">
                    <ButtonForm
                      label="Cancelar"
                      onClick={toggleVisibility}
                      classColor="bg-secondary"
                    />
                    <ButtonForm
                      label="Actualizar"
                      onClick={handleSubmit}
                      classColor="bg-warning"
                    />
                  </div>
                </form>
              </>
            }
          />

          <ModalSucces
            isShowModalSuccess={isShowModalSuccess}
            setIsShowModalSuccess={setIsShowModalSuccess}
            message={modalMessage}
          />
          <ModalError
            isShowModalError={isShowModalError}
            setIsShowModalError={setIsShowModalError}
            message={modalMessage}
          />
          <ModalConfirm
            isShowModalConfirm={isShowModalConfirm}
            setIsShowModalConfirm={setIsShowModalConfirm}
            onClick={() => {
              if (idPatient !== null) {
                deleteItem(idPatient);
              }
            }}
            message="¿Estás seguro de eliminar permanentemente?"
          />
        </>
      }
    />
  );
};

export default ListarPacientes;
