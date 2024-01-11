import { deleteDepartamento, fetchDepartamentos } from "../../../store/slices/departamentoSlice";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { useEffect, useState } from "react";

import { AiFillAppstore } from "react-icons/ai";
import ButtonComun from "../../../components/Botones/ButtonComun";
import { Link } from "react-router-dom";
import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import ModalConfirm from "../../../components/Modal/ModalConfirm";
import ModalError from "../../../components/Modal/ModalError";
import ModalSucces from "../../../components/Modal/ModalSuccess";
import SearchInput from "../../../components/Tablas/components/SearchInput";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import config from "../../../config";
import { resetDeleteStatus } from "../../../store/slices/departamentoSlice";

const baseUrl = config.baseUrl;

const listarDepartamentos = () => {
  const dispatch = useAppDispatch();
  const { loading, error, deleteStatus } = useAppSelector(state => state.departamentoSlice);
  const { departamentos} = useAppSelector(state => state.departamentoSlice);

console.log(departamentos);

  useEffect(() => {
    if (!loading && !error) {
      dispatch(fetchDepartamentos());
    }
  }, [dispatch]);

  useEffect(() => {
    if (deleteStatus === 'fulfilled') {
      setModalMessage('Departamento eliminado con éxito');
      setIsShowModalSuccess(true);
    } else if (deleteStatus === 'rejected') {
      setModalMessage('Hubo un error al eliminar el departamento');
      setIsShowModalError(true);
    }
  }, [deleteStatus]);

  const navigationItems = [
    { to: "/", text: "Home", icon: <AiFillAppstore /> },
    { to: "/admin/departamentos/listar", text: "Departamentos" },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  const areas = departamentos;

  const filteredAreas = areas.filter((area) =>
    area.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteItem = () => {
    setIsShowModalConfirm(false);
    dispatch(deleteDepartamento(idArea));
  };

  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [idArea, setIdArea] = useState("");

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
            title="DEPARTAMENTOS"
            linkTo="/admin/departamentos/agregar"
            linkText="Agregar Departamento"
          />
          <div className="p-2 flex justify-end">
            <SearchInput
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
            />
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredAreas.map((area, index) => (
              <div
                className="border-2 shadow-lg text-center flex flex-col rounded-lg justify-between"
                key={index}
              >
                <div>
                  <h4 className="uppercase font-semibold p-2">{area.nombre}</h4>
                  <img
                    className="h-48 w-full object-cover"
                    src={`${baseUrl}/storage/${area.imagen}`}
                    alt={area.nombre}
                  />
                  <div className="p-4 grid grid-cols-1 gap-4">
                    <p className="mt-2">{area.descripcion}</p>
                  </div>
                </div>
                <div className="py-4 flex justify-center gap-2">
                  <ButtonComun
                    classColor="bg-danger"
                    text="Eliminar"
                    onClick={() => {
                      setIdArea(area.id);
                      setIsShowModalConfirm(true);
                    }}
                  />
                  <Link to={`/admin/departamentos/${area.id}`}>
                    <ButtonComun
                      classColor="bg-primary"
                      text="Ver detalles"
                      onClick={() => {}}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
          <ModalConfirm
            isShowModalConfirm={isShowModalConfirm}
            setIsShowModalConfirm={setIsShowModalConfirm}
            onClick={deleteItem}
            message="¿Estás seguro de eliminar permanentemente?"
          />
        </>
      }
    />
  );
};

export default listarDepartamentos;