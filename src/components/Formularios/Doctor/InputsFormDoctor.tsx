
import NumberInput from "../../Inputs/NumberInput";
import TextInput from "../../Inputs/TextInput";
import RadioButtonGroup from "../../Inputs/RadioButtonGroup";
import EmailInput from "../../Inputs/EmailInput";
import HorarioInput from "../../Inputs/HorarioInput";
import SelectInput from "../../Inputs/SelectInput";
import ModalError from "../../../components/Modal/ModalError";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { fetchDepartment, fetchSpecialties } from "../../../store/slices/doctorSlice";
import { RootState } from "../../../store";
import { useEffect,useState } from "react";
interface InputsFormDoctorProps {
  formData: {
    dni: string;
    name: string;
    lastname: string;
    specialty: { id: string; nombre: string };
    department:{ id: string; nombre: string };
    sex: string;
    phone: string;
    email: string;
    status: string;
    horario: {
      dias_semana: string;
      entrada: string;
      salida: string;
    }[];
    horarioanterior?:{
      dias_semana: string;
      entrada: string;
      salida: string;
    }[];
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{ dni: string; name: string; lastname: string; specialty: { id: string; nombre: string };department:{ id: string; nombre: string }; sex: string; phone: string; email: string; status: string; horario: {
      dias_semana: string;
      entrada: string;
      salida: string;
    }[];
    horarioanterior?:{
      dias_semana: string;
      entrada: string;
      salida: string;
    }[];}>
  >;
}

// formulario hijo(solo inputs)

const InputsFormDoctor: React.FC<InputsFormDoctorProps> = ({ formData, setFormData }) => {
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const dispatch = useAppDispatch();
  const especialidades = useAppSelector((state: RootState) => state.doctorSlice.specialties); // Asegúrate de reemplazar 'doctor' con el nombre de tu slice
  const departamentos = useAppSelector((state: RootState) => state.doctorSlice.departments);
 
  useEffect(() => {
    dispatch(fetchSpecialties());
    dispatch(fetchDepartment());
  }, [dispatch]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'specialty') {
      // Busca la especialidad seleccionada
      const selectedSpecialty = especialidades.find(
        (especialidad) => especialidad.id == value
      );


      if (selectedSpecialty) {
        // Actualiza el estado de specialty con la especialidad seleccionada
        setFormData({
          ...formData,
          specialty:  selectedSpecialty,
        });
      }

    } else if( name==='department') {
      const selectedDepartment = departamentos.find(
        (departamento) => departamento.id == value
      );

      if (selectedDepartment) {
        // Actualiza el estado de specialty con la especialidad seleccionada
        setFormData({
          ...formData,
          department:  selectedDepartment,
        });
      }
      
    }
     else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleGenderChange = (sex: string) => {
    setFormData({ ...formData, sex });
  };

  const handleStatusChange = (status: string) => {
    setFormData({ ...formData, status });
  };


  const handleHorarioChange = (
    nuevoHorario: {
      dias_semana: string;
      entrada: string;
      salida: string;
    }[]
  ) => {
    const horariosNoRepetidos = nuevoHorario.filter((horario, index, self) => {
      return (
        index === self.findIndex((h) => h.dias_semana === horario.dias_semana && h.entrada === horario.entrada && h.salida === horario.salida)
        );
    });

    if (horariosNoRepetidos.length === nuevoHorario.length) {
      // No hay horarios repetidos, actualiza el estado
      setFormData({ ...formData, horario: horariosNoRepetidos });
    } else {
      // Hay horarios repetidos, muestra el modal de error
      setModalMessage("¡El horario ya existe");
      setIsShowModalError(true);
    }

  };


  return (
    <>
      <NumberInput
        label="DNI"
        id="dni"
        name="dni"
        value={formData.dni}
        placeholder=""
        onChange={handleInputChange}
      />
      <TextInput
        label="Nombres"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Escriba su nombre"
      />
      <TextInput
        label="Apellidos"
        id="lastname"
        name="lastname"
        value={formData.lastname}
        onChange={handleInputChange}
        placeholder="Escriba su apellido"
      />

        <SelectInput
          label="Especialidad"
          id="specialty"
          name="specialty"
          value={formData.specialty}
          options={especialidades}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e)}
        />

      <SelectInput
          label="Departamento"
          id="department"
          name="department"
          value={formData.department}
          options={departamentos}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e)}
        />
      <RadioButtonGroup
        label="Sexo"
        options={["Masculino", "Femenino", "Personalizado"]}
        selectedOption={formData.sex.trim()}
        onSelectionChange={handleGenderChange}
      />
      <NumberInput
        label="Teléfono"
        id="phone"
        name="phone"
        value={formData.phone.trim()}
        onChange={handleInputChange}
        placeholder="+51"
      />
      <EmailInput
        label="Correo electrónico"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
        <RadioButtonGroup
        label="Estado"
        options={["Activo", "Inactivo"]}
        selectedOption={formData.status.trim()}
        onSelectionChange={handleStatusChange}
      />
      <hr/>
         <HorarioInput
        label="Horario"
        horario={formData.horario}
        setHorario={handleHorarioChange}
      />
            <ModalError
            isShowModalError={isShowModalError}
            setIsShowModalError={setIsShowModalError}
            message={modalMessage}
          />
   
    </>
  );
};

export default InputsFormDoctor;
