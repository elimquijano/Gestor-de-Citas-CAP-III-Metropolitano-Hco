import React, { useEffect, useState } from 'react';

import SimpleTable from '../../Tablas/SimpleTable';
import { addReservation} from '../../../store/slices/citasSlice';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { RootState } from '../../../store';
import { loadPatients } from '../../../store/slices/pacienteSlice';

type InputsFormCitasProps = {
  selectedTime: { start: Date | null; end: Date | null };
  closeModal: () => void;
  selectedDepartment: number;
};

interface FormData {
  id: number;
  cod_paciente: number | null;
  cod_doctor: number | null;
  cod_departamento: number | null;
  fecha: string | null;
  hora_inicio: string | null;
  hora_fin: string | null;
  activo: 'S' | 'N';
}



const InputsFormCitas: React.FC<InputsFormCitasProps> = ({ selectedTime, closeModal, selectedDepartment }) => {

  const dispatch = useAppDispatch();


  const patients = useAppSelector((state: RootState) => state.pacienteSlice.patients);
  const doctors = useAppSelector(state => state.doctorSlice.doctors);
  const doctorsInDepartment = doctors.filter(doctor => doctor.cod_departamento.toString() === selectedDepartment.toString());


  const department = useAppSelector(state => state.departamentoSlice.departamentos.find(depto => depto.id.toString() === selectedDepartment.toString()));

  // Ahora puedes acceder al nombre del departamento
  const departmentName = department?.nombre;


  console.log(doctorsInDepartment);
  

  console.log(doctorsInDepartment);
  
  const pacientes = patients;

// Suponiendo que cada doctor tiene un array de horarios
// y cada horario es un objeto con un inicio y un fin
const matchingDoctors = doctorsInDepartment.filter(doctor => {
  return doctor.horarios.some(horario => {
    // Convertir las horas de inicio y fin a objetos Date para poder compararlas
    const scheduleStart = new Date(`1970-01-01T${horario.entrada}:00`);
    const scheduleEnd = new Date(`1970-01-01T${horario.salida}:00`);
    const selectedStart = new Date(`1970-01-01T${format(selectedTime.start as Date, 'HH:mm')}:00`);
    const selectedEnd = new Date(`1970-01-01T${format(selectedTime.end as Date, 'HH:mm')}:00`);

    // Comprobar si el horario seleccionado está dentro del horario del doctor
    return selectedStart >= scheduleStart && selectedEnd <= scheduleEnd;
  });
});

// Ahora matchingDoctors contiene todos los doctores cuyos horarios coinciden con el horario seleccionado
// Podemos obtener sus IDs así:
const matchingDoctorIds = matchingDoctors.map(doctor => doctor.id);

console.log(matchingDoctorIds[0]);

  useEffect(() => {
    dispatch(loadPatients());
  }, [dispatch]);



  const [formData, setFormData] = useState<FormData>({
    id: 0,
    cod_paciente: null,
    cod_doctor: Number(matchingDoctorIds?.[0]),
    cod_departamento: null,
    fecha: null,
    hora_inicio: null,
    hora_fin: null,
    activo: 'S',
  });

 

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReservation: Omit<FormData, 'id'> = {
      cod_paciente: formData.cod_paciente,
      cod_doctor: formData.cod_doctor,
      cod_departamento: selectedDepartment,
      fecha: format(selectedTime.start as Date, 'yyyy-MM-dd'),
      hora_inicio: format(selectedTime.start as Date, 'HH:mm'),
      hora_fin: format(selectedTime.end as Date, 'HH:mm'),
      activo: 'S'
    };

    dispatch(addReservation(newReservation))
    closeModal();
  };



  interface Row {
    [key: string]: any;
  }

  const [selectedPatient, setSelectedPatient] = useState<{
    id: number;
    numero_documento: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
  } | null>(null);

  const handlePatientSelection = (row: Row) => {
    const paciente = row as {
      id: number;
      numero_documento: string;
      nombres: string;
      apellido_paterno: string;
      apellido_materno: string;
    };
    setSelectedPatient(paciente);
    setFormData((prevState) => ({
      ...prevState,
      cod_paciente: paciente.id, // Aquí es donde debes establecer el código del paciente
      numero_documento: paciente.numero_documento,
      nombres: paciente.nombres,
      apellido_paterno: paciente.apellido_paterno,
      apellido_materno: paciente.apellido_materno,
    }));
  };
  

 
  const columns = [
    { header: 'ID', value: 'id' },
    { header: 'Nombre', value: 'nombres' },
    { header: 'Apellido', value: 'apellido_paterno' },
    { header: 'Dni', value: 'numero_documento' },
  ];

  return (
    <form className="bg-white rounded-lg shadow-lg p-8" onSubmit={handleFormSubmit}>
      <h2 className="text-2xl mb-8 justify-center flex font-bold ">Agregar Cita</h2>

      <div className="py-6">
        <p className="mb-4 font-semibold text-slate-500">
          Para el día : {selectedTime.start && format(selectedTime.start, 'dd-MM-yyyy', { locale: es })} desde las {selectedTime.start && format(selectedTime.start, 'HH:mm', { locale: es })}
      
          , hasta las {selectedTime.end && format(selectedTime.end, 'HH:mm', { locale: es })} horas
        </p>
        
        <SimpleTable data={pacientes} columns={columns} onSelect={handlePatientSelection} />

        {selectedPatient && (
          <p className='mt-4 justify-center flex bg-slate-200 p-4 rounded-lg'>
            El paciente {selectedPatient.nombres} tendrá una cita programada para{' '}
            {selectedTime.start && format(selectedTime.start, 'dd MMMM yyyy ', { locale: es })} a las{' '}
            {selectedTime.start && format(selectedTime.start, 'HH:mm', { locale: es })}{' '}horas en el departamento de {' '}
            {departmentName}{' '}si es correcto por favor envie el formulario.
          </p>
        )}
      </div>
      <div className="flex gap-4 justify-end border-t-2 pt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={closeModal}>
          Cerrar
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default InputsFormCitas;