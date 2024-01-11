import { useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import ButtonForm from "../../../components/Botones/ButtonForm";
import { useAppDispatch } from "../../../shared/hooks";
import { addPatient, fetchPatients } from "../../../store/slices/pacienteSlice";
import InputsFormPaciente from "../../../components/Formularios/Paciente/InputsFormPaciente";
import ModalSucces from "../../../components/Modal/ModalSuccess";
import ModalError from "../../../components/Modal/ModalError";

const AgregarPacientes = () => {
  const navigationItems = [
    { to: "/", text: "Home", icon: <AiFillAppstore /> },
    { to: "/admin/pacientes/listar", text: "Pacientes" },
    { to: "/admin/pacientes/agregar", text: "Añadir Paciente" },
  ];
  const dispatch = useAppDispatch();

  const initialFormData = {
    numero_documento: "",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    sexo: "",
    password: "",
    confirm_password: "",
    estado_civil: { id: "", nombre: "" },
    grupo_sangre: { id: "", nombre: "" },
    direccion: "",
    fecha_nacimiento: new Date().toISOString().slice(0, 10),
    imagen: "",
    correo: "",
    activo: "Activo",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newPatient = {
      ...formData,
      estado_civil: formData.estado_civil.id,
      grupo_sangre: formData.grupo_sangre.id,

    };


    type Patient = {
      [key: string]: string | { id: string, nombre: string } | null | undefined;
      // ...resto de las propiedades...
    };

    const areAllFieldsFilled = (patient: Patient) => {
      for (let key in patient) {
        if (patient[key] === "" || patient[key] === null || patient[key] === undefined) {
          return false;
        }
      }
      return true;
    };
    const isFilled = areAllFieldsFilled(newPatient);
    if (isFilled && formData.confirm_password === formData.password) {
      try {
        await dispatch(addPatient(newPatient));
        await dispatch(fetchPatients());
        resetFormData();
        setIsShowModalSuccess(true);
      } catch (error) {
        setModalMessage("¡ocurrio un error!, inténtalo más tarde");
        setIsShowModalError(true);
      }
    } else {
      setModalMessage("¡Error! asegurece de llenar correctamente todos los campos por favor");
      setIsShowModalError(true);
    }
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <MainLayoutAdmin
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces
            title="AGREGAR PACIENTE"
            linkTo="/admin/pacientes/listar"
            linkText="Lista de Pacientes"
          />
          {/* formulario */}
          <form className="p-4 grid grid-cols-2 gap-8">
            <InputsFormPaciente formData={formData} setFormData={setFormData} />
            <div className="flex gap-2 col-span-2 justify-end">
              <ButtonForm
                label="Restablecer"
                onClick={resetFormData}
                classColor="bg-warning"
              />
              <ButtonForm
                label="Agregar"
                onClick={handleSubmit}
                classColor="bg-primary"
              />
            </div>
          </form>
          <ModalSucces
            isShowModalSuccess={isShowModalSuccess}
            setIsShowModalSuccess={setIsShowModalSuccess}
            message="¡Se agregó un nuevo paciente correctamente!"
          />
          <ModalError
            isShowModalError={isShowModalError}
            setIsShowModalError={setIsShowModalError}
            message={modalMessage}
          />
        </>
      }
    />
  );
};

export default AgregarPacientes;