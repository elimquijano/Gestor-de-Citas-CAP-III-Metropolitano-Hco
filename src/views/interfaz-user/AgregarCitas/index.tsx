import { AiFillAppstore} from "react-icons/ai";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


import Calendario from "../../../components/Calendario";


import { RootState } from '../../../store';
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { fetchReservations } from "../../../store/slices/citasSlice";
import { fetchDepartamentos } from "../../../store/slices/departamentoSlice";
import MainLayoutPatient from "../../../components/MainLoyout/MainLayoutPatient";

const AddCitas = () => {
  const navigationItems = [
    { to: "/", text: "Home", icon: <AiFillAppstore /> },
    { to: "/dashboard/user/citas", text: "Mis Citas" },
    { to: "/dashboard/user/citas/agregar", text: "Agregar cita" }

  ]
    const { loading, error} = useAppSelector(state => state.citasSlice);
    const { departamentos} = useAppSelector(state => state.departamentoSlice);

    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (!loading && !error) {
        dispatch(fetchReservations());
      }
    }, [dispatch]);
  
    useEffect(() => {
      if (!loading && !error) {
        dispatch(fetchDepartamentos());
      }
    }, [dispatch]);
  
    const [selectedDepartment, setSelectedDepartment] = useState(0);
  
    const reservationsArray = useAppSelector((state: RootState) => state.citasSlice.reservations);
  
    
  
    const filteredReservations = reservationsArray.filter(cita => cita.cod_departamento === selectedDepartment);
  
  
    
    
  
    function chunkArray(array: any[], chunkSize: number): any[][] {
      const results = [];
      const copy = [...array]; // Crea una copia del array
      while (copy.length) {
        results.push(copy.splice(0, chunkSize));
      }
      return results;
    }
  
    const chunkedDepartments = chunkArray(departamentos, 4);
  
    const [carouselIndex, setCarouselIndex] = useState(0);
  
    return (
      <MainLayoutPatient
      navigationItems={navigationItems}
      children={
        <>
            <SubHeaderConEnlaces
              title="AGREGAR CITAS"
              linkTo="/dashboard/user/citas/listar"
              linkText="Lista de Citas"
            />
  
            {/* Lista de departamentos */}
            <div className="flex gap-4  justify-center items-center py-4 ">
              <button onClick={() => setCarouselIndex((carouselIndex - 1 + chunkedDepartments.length) % chunkedDepartments.length)}>
                <FaChevronLeft />
              </button>
              <div className="department-list flex space-x-4 justify-center overflow-x-hidden" style={{ width: '80%', overflow: 'hidden' }}>
                {chunkedDepartments.map((chunk, index) => (
                  <div
                    key={index}
                    className={`carousel-slide flex space-x-4 ${carouselIndex === index ? 'block' : 'hidden'}`}
                  >
                    {chunk.map((department, index) => (
                      <button
                        key={index}
                        className={`department-card flex items-center justify-center space-x-2 py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${selectedDepartment === department.id ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-600 hover:bg-gray-500'}`}
                        onClick={() => setSelectedDepartment(department.id)}
                      >
              
                        <span>{department.nombre}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <button onClick={() => setCarouselIndex((carouselIndex + 1) % chunkedDepartments.length)}>
                <FaChevronRight />
              </button>
            </div>
  
  
            {/* formulario */}
            {selectedDepartment ? <Calendario reservations={filteredReservations} selectedDepartment={selectedDepartment} /> : <p className="text-center font-bold py-40">Seleccione el departamento en el que desee reservar su cita.</p>}
          </>
        }
      />
    );
  };
  
  export default AddCitas;