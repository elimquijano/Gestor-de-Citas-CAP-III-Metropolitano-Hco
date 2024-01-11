import { AiFillAppstore } from "react-icons/ai";
import ButtonForm from "../../../components/Botones/ButtonForm";
import InputsFormPerfil from "../../../components/Formularios/PerfilAdmin/InputsFormPerfil";
import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ModalError from "../../../components/Modal/ModalError";
import ModalSucces from "../../../components/Modal/ModalSuccess";
import { useAppSelector } from "../../../shared/hooks";
import { RootState } from "../../../store";
import { updateAdmin } from "../../../store/slices/adminSlice";
import config from "../../../config";
const baseUrl = config.baseUrl;

const Perfil = () => {
  const navigationItems = [
    { to: "/admin", text: "Home", icon: <AiFillAppstore /> },
    { to: "/admin/perfil", text: "Mi Perfil" }, // Sin icono
  ];

  const user = useAppSelector((state: RootState) => state.adminSlice.admin);

  // formulario
  const [formData, setFormData] = useState({
    name: user.nombres,
    lastname: user.apellido_paterno,
    email: user.email,
    password: user.password,
    image: user.imagen,
  });
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const isFilled = areAllStringFieldsFilled(formData);
    if (isFilled) {
      try {
        dispatch(updateAdmin(formData));
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

  // alert
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // verificar si los campos estan vacios
  function areAllStringFieldsFilled(obj: { [key: string]: any }) {
    return Object.entries(obj).every(
      ([, val]) => typeof val === "string" && val !== ""
    );
  }
  return (
    <MainLayoutAdmin
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces
            title="MI PERFIL"
            linkTo="/admin/pacientes/listar"
          />
          <div className="grid md:grid-cols-[30%_70%]">
            <div className="flex justify-center items-center">
              <img
                className="w-80 h-80 object-contain shadow-xl"
                src={`${baseUrl}/storage/${user.imagen}`}
                alt="Imgen de perfil"
              />
            </div>
            {/* formulario */}
            <form className="p-4 grid grid-cols-2 gap-8">
              <InputsFormPerfil formData={formData} setFormData={setFormData} />
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
              message="¡Se actualizaron los datos correctamente!"
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

export default Perfil;
