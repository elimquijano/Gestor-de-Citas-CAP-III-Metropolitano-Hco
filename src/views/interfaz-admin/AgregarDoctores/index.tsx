import { useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import InputsFormDoctor from "../../../components/Formularios/Doctor/InputsFormDoctor";
import ButtonForm from "../../../components/Botones/ButtonForm";
import { addDoctor,fetchDoctors } from "../../../store/slices/doctorSlice";
import ModalSucces from "../../../components/Modal/ModalSuccess";
import ModalError from "../../../components/Modal/ModalError";
import { useAppDispatch } from "../../../shared/hooks";

const AgregarDoctores = () => {
  // main layout
  const navigationItems = [
    { to: "/", text: "Home", icon: <AiFillAppstore /> },
    { to: "/admin/doctores/listar", text: "Doctores" },
    { to: "/admin/doctores/agregar", text: "Agregar Doctor" },
  ];
  const dispatch = useAppDispatch();
  // formulario
  const [formData, setFormData] = useState({
    dni: "",
    name: "",
    lastname: "",
    specialty: { id: "", nombre: "" },
    department: { id: "", nombre: "" },
    sex: "",
    phone: "",
    email: "",
    status: "Activo",
    horario: [] as { dias_semana: string; entrada: string; salida: string }[],
  });

  const horariosSeparados = formData.horario.map(({ dias_semana, entrada, salida }) => ({
    dias_semana: dias_semana,
    entrada: entrada,
    salida: salida,
  }));
  
  const handleSubmit = async () => {
    const fecha = new Date().toISOString().slice(0, 10);
    const newDoctor = {
      dni: formData.dni,
      nombres: formData.name,
      apellidos: formData.lastname,
      cod_especialidad: String(formData.specialty.id),
      cod_departamento:  String(formData.department.id),
      sexo: formData.sex,
      telefono: formData.phone,
      correo: formData.email,
      estado: formData.status,
      fecha_registro: fecha,
      horarios: horariosSeparados,
      activo: 'S', 
    };

    const isFilled = areAllStringFieldsFilled(newDoctor);
  
    if (isFilled) {
      try {
        await dispatch(addDoctor(newDoctor));
        await dispatch(fetchDoctors());
        resetFormData();
        setIsShowModalSuccess(true);
      } catch (error) {
        setModalMessage("¡ocurrio un error!, inténtalo más tarde");
        setIsShowModalError(true);
        console.log(error);
      }
    } else {
      setModalMessage("¡Error! rellene todos los campos por favor");
      setIsShowModalError(true);
    }
  };

  const resetFormData = () => {
    setFormData({
      dni: "",
      name: "",
      lastname: "",
      specialty: { id: "", nombre: "" },
      department: { id: "", nombre: "" },
      sex: "",
      phone: "",
      email: "",
      status: "Activo",
      horario: [] as { dias_semana: string; entrada: string; salida: string }[],
    });
  };

  // alert
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function areAllFieldsFilled(value: any): boolean {
    if (Array.isArray(value)) {
      // Verifica si el array tiene al menos un elemento
      return value.length > 0;
    }
  
    // Para otros tipos, verifica si es una cadena y no está vacío
    return typeof value === 'string' && value !== '';
  }
  
  function areAllStringFieldsFilled(obj: { [key: string]: any }) {
    const result = Object.entries(obj).every(([key, val]) => {
      const isFilled = areAllFieldsFilled(val);
      if (!isFilled) {
        console.log(`Campo "${key}" no está lleno o no es una cadena.`);
      }
      return isFilled;
    });
  
    return result;
  }

  return (
    <MainLayoutAdmin
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces
            title="AGREGAR DOCTOR"
            linkTo="/admin/doctores/listar"
            linkText="Lista de Doctores"
          />

          {/* formulario */}
          <form className="p-4 grid grid-cols-2 gap-8">
            <InputsFormDoctor formData={formData} setFormData={setFormData} />
            <div className="flex gap-2 col-span-2 justify-end">
              <ButtonForm   
                label="Restablecer"
                onClick={resetFormData}
                classColor="bg-warning"
              />
              <ButtonForm
                label="Guardar"
                onClick={handleSubmit}
                classColor="bg-primary"
              />
            </div>
          </form>
          <ModalSucces
            isShowModalSuccess={isShowModalSuccess}
            setIsShowModalSuccess={setIsShowModalSuccess}
            message="¡Se agregó un nuevo doctor correctamente!"
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

export default AgregarDoctores;