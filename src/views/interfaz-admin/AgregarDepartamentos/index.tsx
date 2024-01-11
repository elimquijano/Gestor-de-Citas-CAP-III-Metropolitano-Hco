import { useState, useEffect } from "react";
import { AiFillAppstore } from "react-icons/ai";
import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import InputsFormDepartamento from "../../../components/Formularios/Departamento/InputsFormDepartamento";
import ButtonForm from "../../../components/Botones/ButtonForm";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { addDepartamento, resetDeleteStatus, } from "../../../store/slices/departamentoSlice";
import ModalSucces from "../../../components/Modal/ModalSuccess";
import ModalError from "../../../components/Modal/ModalError";




const AgregarDepartamentos = () => {
  // main layout
  const navigationItems = [
    { to: "/", text: "Home", icon: <AiFillAppstore /> },
    { to: "/admin/departamentos/listar", text: "Departamentos" },
    { to: "/admin/departamentos/agregar", text: "Agregar Departamento" }, // Sin icono
  ];
  const dispatch = useAppDispatch();
  const { addStatus } = useAppSelector(state => state.departamentoSlice);

  // alert
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (addStatus === 'fulfilled') {
      setModalMessage('Departamento agregado con éxito');
      setIsShowModalSuccess(true);
      resetFormData();
    } else if (addStatus === 'rejected') {
      setModalMessage('Hubo un error al agregar el departamento');
      setIsShowModalError(true);
    }
  }, [addStatus]);

  // formulario
  const initialFormData = {
    nombre: "",
    imagen: "",
    descripcion: "",
    encargado: "",
  };
  
  const [formData, setFormData] = useState(initialFormData);
  
  const resetFormData = () => setFormData(initialFormData);

  function areAllStringFieldsFilled(obj: { [key: string]: any }): boolean {
    for (let key in obj) {
      if (typeof obj[key] !== 'string' || obj[key].trim() === '') {
        return false;
      }
    }
    return true;
  }

  
  const handleSubmit = () => {
    const newDepartament = {
      nombre: formData.nombre,
      imagen: formData.imagen,
      descripcion: formData.descripcion,
      encargado: formData.encargado,
      activo: 'S',
    };
    const isFilled = areAllStringFieldsFilled(newDepartament);
    if (isFilled) {
      
console.log(newDepartament);


      dispatch(addDepartamento(newDepartament));
    } else {
      setModalMessage("¡Error! rellene todos los campos por favor")
      setIsShowModalError(true);
    }
  }; 

  useEffect(() => {
    return () => {
      // Aquí puedes resetear el estado deleteStatus
      dispatch(resetDeleteStatus()); // Asegúrate de implementar esta acción en tu slice
    };
  }, []);
  
  return (
    <MainLayoutAdmin
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces
            title="AGREGAR DEPARTAMENTO"
            linkTo="/admin/departamentos/listar"
            linkText="Lista de departamentos"
          />
          {/* formulario */}
          <form className="p-4 grid grid-cols-2 gap-8">
            <InputsFormDepartamento
              formData={formData}
              setFormData={setFormData}
            />
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
            message="¡Se agregó un nuevo departamento correctamente!"
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

export default AgregarDepartamentos;