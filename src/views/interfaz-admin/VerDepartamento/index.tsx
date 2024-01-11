import {  useEffect, useState } from "react";

import { AiFillAppstore } from "react-icons/ai";
import ButtonForm from "../../../components/Botones/ButtonForm";
import { FaEdit } from "react-icons/fa";
import InputsFormDepartamento from "../../../components/Formularios/Departamento/InputsFormDepartamento";
import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import ModalCenter from "../../../components/Modal/ModalCenter";
import ModalError from "../../../components/Modal/ModalError";
import ModalSucces from "../../../components/Modal/ModalSuccess";
import { RootState } from "../../../store";
import config from "../../../config";

import { toggleModal } from "../../../store/slices/mainLayoutSlice";
import { updateDepartamento , loadDepartamento} from "../../../store/slices/departamentoSlice";
import { useAppDispatch } from "../../../shared/hooks";
import { useAppSelector } from "../../../shared/hooks";
import { useParams } from "react-router-dom";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";

const baseUrl = config.baseUrl;

type MatchParams = Record<string, string | undefined>;

const VerDepartamento = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<MatchParams>();

  const navigationItems = [
    { to: "/", text: "Home", icon: <AiFillAppstore /> },
    { to: "/admin/departamentos/listar", text: "Departamentos" },
  ];

  const departamento = useAppSelector(
    (state: RootState) => state.departamentoSlice.departamento
  )

  console.log(departamento);
  
  useEffect(() => {
    if (id) {
      dispatch(loadDepartamento(id));
    }
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    nombre: '',
    imagen: '',
    descripcion: '',
    encargado: '',
  });

  useEffect(() => {
    if (departamento) {
      setFormData({
        nombre: departamento.nombre,
        imagen: departamento.imagen,
        descripcion: departamento.descripcion,
        encargado: departamento.encargado,
      });
    }
  }, [departamento]);

  const toggleVisibility = () => {
    dispatch(toggleModal());
  };


  const handleSubmit = async () => {
    try {
      if (!departamento) {
        return;
      }
      await dispatch(updateDepartamento({ ...departamento, ...formData }));
      toggleVisibility();
     

      setModalMessage("¡Se actualizaron los datos correctamente!");
      setIsShowModalSuccess(true);
       dispatch(loadDepartamento(departamento.id)); // Forzar una nueva carga del departamento
       console.log(departamento.id);
       
      
    } catch (error) {
      toggleVisibility();
      setModalMessage("¡ocurrio un error!, inténtalo más tarde");
      setIsShowModalError(true);
    }
  };
  

  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");



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
          <div className="mt-4">
            <div className="p-4 text-center bg-primary text-white">
              <strong className="uppercase text-3xl">
                área de {departamento?.nombre}
              </strong>
            </div>
            <div className="flex flex-col md:flex-row p-4 gap-6">
              <div className="md:w-1/2">
                <img
                  className="w-full h-64 md:h-auto md:max-h-96 object-cover rounded-lg"
                  src={`${baseUrl}/storage/${departamento?.imagen}`}
                  alt={departamento?.nombre}
                />
              </div>

              <div className=" flex flex-col gap-4 md:w-1/2 text-lg md:text-base">
                <div className="flex justify-between mb-4 bg-slate-300 rounded-lg p-4">
                  <p>
                    <span className="font-bold">Fecha de registro:</span>
                    <br />
                    {departamento?.created_at}
                  </p>
                  <div className="text-end px-4">
                    <button
                      type="button"
                      className="p-2 rounded bg-warning"
                      onClick={() => {
                        toggleVisibility();
                      }}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <p className="mb-4 flex-grow mx-4">
                  <span className="font-bold">Descripción:</span>
                  <br />
                  {departamento?.descripcion}
                </p>
                <div className="mx-4">
                  <span className="font-bold">Encargado:</span>
                  <br />
                  {departamento?.encargado}
                </div>
              </div>


            </div>
          </div>
          <ModalCenter
            modalChildren={
              <>
                <form className="p-4 grid grid-cols-2 gap-8">
                  <InputsFormDepartamento
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
          {/* alertas */}
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
        </>
      }
    />
  );
};

export default VerDepartamento;