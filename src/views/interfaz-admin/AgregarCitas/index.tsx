import { AiFillAppstore } from "react-icons/ai";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


import Calendario from "../../../components/Calendario";

import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import { RootState } from '../../../store';
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { fetchReservations, setDoctorColors } from "../../../store/slices/citasSlice";
import { fetchDepartamentos } from "../../../store/slices/departamentoSlice";
import { fetchDoctors } from "../../../store/slices/doctorSlice";

const AgregarCitas = () => {
  // main layout 
  const dispatch = useAppDispatch();
  const navigationItems = [
    { to: "/admin", text: "Home", icon: <AiFillAppstore /> },
    { to: "/admin/citas/listar", text: "Citas" },
    { to: "/admin/citas/agregar", text: "Agregar Citas" }, // Sin icono
  ];
  const { loading, error } = useAppSelector(state => state.citasSlice);
  const { departamentos } = useAppSelector(state => state.departamentoSlice);



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


  const doctors = useAppSelector(state => state.doctorSlice.doctors);


  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchReservations());
  }, [dispatch]);




  const doctorsInDepartment = doctors.filter(doctor => doctor.cod_departamento.toString() === selectedDepartment.toString());


  const [carouselIndex, setCarouselIndex] = useState(0);

  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);


  const filteredReservations = reservationsArray.filter(cita => cita.cod_departamento === selectedDepartment);
  console.log('se filtran las reservaciones');

console.log(filteredReservations);




  function chunkArray(array: any[], chunkSize: number): any[][] {
    const results = [];
    const copy = [...array]; // Crea una copia del array
    while (copy.length) {
      results.push(copy.splice(0, chunkSize));
    }
    return results;
  }

  const chunkedDepartments = chunkArray(departamentos, 4);


  console.log('seleccion del doctor');
  console.log(selectedDoctor);

  function generatePastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.random() * 10;
    const lightness = 85 + Math.random() * 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  const doctorColors = useAppSelector((state: RootState) => state.citasSlice.doctorColors);
  const [newDoctorColors, setNewDoctorColors] = useState<Record<string, string>>({});

console.log(doctorColors);
dispatch(setDoctorColors(newDoctorColors));

useEffect(() => {
  setSelectedDoctor(null);
}, [selectedDepartment]);


  return (
    <MainLayoutAdmin
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces
            title="AGREGAR CITAS"
            linkTo="/admin/citas/listar"
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
                      className={`department-card flex items-center justify-center space-x-2 py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${selectedDepartment === department.id ? 'bg-cyan-400 hover:bg-cyan-500' : 'bg-gray-600 hover:bg-gray-500'}`}
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

          <div className="flex flex-wrap justify-center gap-4 border-t-2 pt-6 pb-6">
            {selectedDepartment > 0 ? (
              <button
                className={`p-4 rounded-lg shadow-lg text-gray-100 text-center flex gap-2 ${selectedDoctor === null ? 'bg-cyan-400' : 'bg-red-400 hover:bg-red-500'}`}
                onClick={() => setSelectedDoctor(null)}
              >
                <span>Todos los doctores</span>
              </button>
            ) : ''}
            {doctorsInDepartment.map((doctor, index) => {
              const doctorId = String(doctor.id);
              if (doctorId !== null && !doctorColors[doctorId]) {
                setNewDoctorColors(prevColors => ({ ...prevColors, [doctorId]: generatePastelColor() }));
              }
              const color = doctorId !== null ? doctorColors[doctorId] : 'gray';
              return (
                <button
                  key={index}
                  style={{ backgroundColor: selectedDoctor === doctor.id ? '' : color }}
                  className={`p-4 rounded-lg shadow-lg text-gray-500 text-center flex gap-2 ${selectedDoctor === doctor.id ? 'bg-cyan-400 text-slate-50' : ''}`}
                  onClick={() => setSelectedDoctor(doctor.id)}
                >
                <span className="font-bold">Dr. {' '}{doctor.nombres} {doctor.apellidos}</span>
                  {doctor.horarios.map((horario, index) => (
                    <span key={index}>{horario.dias_semana} {horario.entrada} - {horario.salida}</span>
                  ))}
                </button>
              );
            })}
          </div>
          {/* formulario */}
          <div className={selectedDoctor && Number(selectedDoctor) > 0 || selectedDoctor === null? `bg-cyan-300 p-4 rounded-lg`: 'bg-white'}>
            {selectedDepartment ? (<div className=" p-10 justify-center items-center gap-16 bg-stone-50"><Calendario reservations={filteredReservations} selectedDepartment={selectedDepartment} selectedDoctor={selectedDoctor}/> <CalendarLegend />  </div>): <p className="text-center font-bold py-40">Seleccione el departamento en el que desee reservar su cita.</p>}
          </div>
        </>
      }
    />
  );
};

export default AgregarCitas;



const CalendarLegend: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-200"></div>
        <span>Hoy</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-orange-100"></div>
        <span>Día seleccionado</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-slate-500"></div>
        <span>Dias sin horas disponibles</span>
      </div>
   
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-slate-200"></div>
        <span>Dias pasados</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-green-200"></div>
        <span>Dias con horas disponibles</span>
      </div>
    </div>
  );
};