import { useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import MainLayoutPatient from "../../../components/MainLoyout/MainLayoutPatient";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import ModalSucces from "../../../components/Modal/ModalSuccess";
import ModalError from "../../../components/Modal/ModalError";
import ButtonForm from "../../../components/Botones/ButtonForm";
import InputsFormPaciente from "../../../components/Formularios/Paciente/InputsFormPaciente";
import config from "../../../config";
import { updatePatient, updatePatientFailure, updatePatientSuccess } from "../../../store/slices/pacienteSlice";
const baseUrl = config.baseUrl;

const PerfilUser = () => {
  const navigationItems = [
    { to: "/dashboard/user", text: "Home", icon: <AiFillAppstore /> },
    { to: "/dashboard/user/perfil", text: "Mi Perfil" },
  ];
  const user = useAppSelector(
    (state) => state.pacienteSlice.patients
  )[0];
  // formulario
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
  const [formData, setFormData] = useState<Patient>({
    id: user["id"],
    numero_documento: user["numero_documento"] || "",
    nombres: user["nombres"] || "",
    apellido_paterno: user["apellido_paterno"] || "",
    apellido_materno: user["apellido_materno"] || "",
    telefono: user["telefono"] || "",
    sexo: user["sexo"] || "",
    password: user["password"] || "",
    estado_civil: {
      id: user["estado_civil"] || "",
      nombre: user["estado_civil"] || "",
    },
    direccion: user["direccion"] || "",
    fecha_nacimiento: user["fecha_nacimiento"] || "",
    imagen: user["imagen"] || "",
    grupo_sangre: {
      id: user["grupo_sangre"] || "",
      nombre: user["grupo_sangre"] || "",
    },
    correo: user["correo"] || "",
    activo: user["activo"] === "S" ? "Activo" : "NoActivo",
    confirm_password: user["password"] || "",
  });
  const dispatch = useAppDispatch();
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

    dispatch(updatePatient(patientToUpdate)).then((action: any) => {
      if (action.payload) {
        dispatch(updatePatientSuccess());
        setModalMessage("Actualización exitosa!");
        setIsShowModalSuccess(true);
      } else {
        dispatch(updatePatientFailure());
        setModalMessage("Error en la actualización.");
        setIsShowModalError(true);
      }
    });
  };

  // alert
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // verificar si los campos estan vacios
  /* function areAllStringFieldsFilled(obj: { [key: string]: any }) {
    return Object.entries(obj).every(
      ([, val]) => typeof val === "string" && val !== ""
    );
  } */
  return (
    <MainLayoutPatient
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces title="MI PERFIL" linkTo="#" />
          <div className="grid md:grid-cols-[30%_70%]">
            <div className="flex justify-center">
              <img
                className="w-80 h-80 object-contain shadow-xl"
                src={`${baseUrl}/storage/${user.imagen}`}
                alt="Imgen de perfil"
              />
            </div>
            {/* formulario */}
            <form className="p-4 grid grid-cols-2 gap-8">
              <InputsFormPaciente
                formData={formData}
                setFormData={setFormData}
              />
              <div className="flex gap-2 col-span-2 justify-end">
                <ButtonForm
                  label="Guardar cambios"
                  onClick={handleSubmit}
                  classColor="bg-primary"
                />
              </div>
            </form>
            <ModalSucces
              isShowModalSuccess={isShowModalSuccess}
              setIsShowModalSuccess={setIsShowModalSuccess}
              message="¡Se actualizaron tus datos correctamente!"
            />
            <ModalError
              isShowModalError={isShowModalError}
              setIsShowModalError={setIsShowModalError}
              message={modalMessage}
            />
          </div>
        </>
      }
    />
  );
};

export default PerfilUser;
