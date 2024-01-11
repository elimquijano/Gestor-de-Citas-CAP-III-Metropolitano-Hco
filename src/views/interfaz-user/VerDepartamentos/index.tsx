import { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import MainLayoutPatient from "../../../components/MainLoyout/MainLayoutPatient";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import SearchInput from "../../../components/Tablas/components/SearchInput";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { fetchDepartamentos } from "../../../store/slices/departamentoSlice";
import config from "../../../config";

const baseUrl = config.baseUrl;

const VerDepartamentos = () => {
  const navigationItems = [
    { to: "/dashboard/user", text: "Home", icon: <AiFillAppstore /> },
    { to: "/dashboard/user/departamentos", text: "Departamentos" },
  ];
  const dispatch = useAppDispatch();
  // lista de departamentos
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { departamentos, loading, error } = useAppSelector(
    (state) => state.departamentoSlice
  );
  useEffect(() => {
    if (!loading && !error) {
      dispatch(fetchDepartamentos());
    }
  }, [dispatch]);
  const filteredAreas = departamentos.filter((area) =>
    area.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <MainLayoutPatient
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces title="DEPARTAMENTOS" linkTo="#" />

          {/* buscador */}
          <div className="p-2 flex justify-end">
            <SearchInput
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
            />
          </div>

          {/* cards */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredAreas.map((area, index) => (
              <div key={index} className="border-2 shadow-lg text-center">
                <div className="flex flex-col h-full">
                  <img
                    className="w-full h-56 object-cover"
                    src={`${baseUrl}/storage/${area.imagen}`}
                    alt={area.nombre}
                  />
                  <div className="grow p-4 flex flex-col justify-between">
                    <h4 className="uppercase font-semibold">{area.nombre}</h4>
                    <p className="py-2">{area.descripcion}</p>
                    <div className="flex gap-2">
                      <label>Encargado:</label>
                      <p>{area.encargado}</p>
                    </div>
                    <div className="flex gap-2">
                      <label>Estado:</label>
                      <p>{area.activo==="S"?"Activo":"Inactivo"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
};

export default VerDepartamentos;
