import { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import MainLayoutPatient from "../../../components/MainLoyout/MainLayoutPatient";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import SearchInput from "../../../components/Tablas/components/SearchInput";

import { RootState } from "../../../store";
import { fetchDoctors } from "../../../store/slices/doctorSlice";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";

const VerDoctores = () => {
  const navigationItems = [
    { to: "/dashboard/user", text: "Home", icon: <AiFillAppstore /> },
    { to: "/dashboard/user/doctores", text: "Doctores" },
  ];
  // lista de departamentos
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {doctors} = useAppSelector((state: RootState) => state.doctorSlice);
const dispatch = useAppDispatch();

useEffect(() => {
  dispatch(fetchDoctors());

}, [dispatch])

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.nombres.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <MainLayoutPatient
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces title="DOCTORES" linkTo="#" />
          <div className="p-2 flex justify-end">
            <SearchInput
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
            />
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                className="border-2 shadow-lg text-center flex flex-col justify-between"
              >
                <div>
                  <img
                    className="h-48 w-full object-cover"
                    src={""}
                    alt="Imagen no disponible"
                  />
                  <div className="p-4 flex flex-col gap-2">
                    <h4 className="uppercase font-semibold">
                      {doctor.nombres + " " + doctor.apellidos}
                    </h4>
                    <div className="flex gap-2">
                      <label>Especialidad:</label>
                      <p>{doctor.cod_especialidad}</p>
                    </div>
                    <div className="flex gap-2">
                      <label>Estado:</label>
                      <p>{doctor.activo==="S"?"Activo":"Inactivo"}</p>
                    </div>
                    <div className="flex gap-2">
                      <label>Sexo:</label>
                      <p>{doctor.sexo}</p>
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

export default VerDoctores;
