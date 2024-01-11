
import TextInput from "../../Inputs/TextInput";
import SelectInput from "../../Inputs/SelectInput";
import ImageInput from "../../Inputs/ImageInput";
import NumberInput from "../../Inputs/NumberInput";
import RadioButtonGroup from "../../Inputs/RadioButtonGroup";
import DateInput from "../../Inputs/DateInput";
import EmailInput from "../../Inputs/EmailInput";
import PasswordInput from "../../Inputs/PasswordInput";

interface Patient {
  numero_documento: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  sexo: string;
  password: string;
  confirm_password: string;
  estado_civil: { id: string; nombre: string };
  direccion: string;
  fecha_nacimiento: string;
  imagen: string;
  grupo_sangre: { id: string; nombre: string };
  correo: string;
  activo: string;
}

interface InputsFormPacienteProps {
  formData: Patient;
  setFormData: React.Dispatch<React.SetStateAction<Patient>>;
}

const InputsFormPaciente = ({
  formData,
  setFormData,
}: InputsFormPacienteProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'estado_civil') {
      setFormData({
        ...formData,
        estado_civil: { id: value, nombre: '' },
      });
    } else if (name === 'grupo_sangre') {
      setFormData({
        ...formData,
        grupo_sangre: { id: value, nombre: '' },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenderChange = (sexo: string) => {
    setFormData({ ...formData, sexo });
  };

  const handleStatusChange = (activo: string) => {
    setFormData({ ...formData, activo });
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const imageData = e.target.result as string;
          setFormData({ ...formData, imagen: imageData });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, imagen: "" });
    }
  };

  return (
    <>
      <TextInput
        label="DNI"
        id="numero_documento"
        name="numero_documento"
        value={formData.numero_documento}
        onChange={handleInputChange}
        placeholder="Escriba su documento de identidad"

      />
      <TextInput
        label="Nombres"
        id="nombres"
        name="nombres"
        value={formData.nombres}
        onChange={handleInputChange}
        placeholder="Escriba su nombre"
      />
      <TextInput
        label="Apellido Paterno"
        id="apellido_paterno"
        name="apellido_paterno"
        value={formData.apellido_paterno}
        onChange={handleInputChange}
        placeholder="Escriba su apellido paterno"
      />
      <TextInput
        label="Apellidos materno"
        id="apellido_materno"
        name="apellido_materno"
        value={formData.apellido_materno}
        onChange={handleInputChange}
        placeholder="Escriba su apellido materno"
      />
      <NumberInput
        label="Teléfono móvil"
        id="telefono"
        name="telefono"
        value={formData.telefono}
        placeholder="+51"
        onChange={handleInputChange}
      />

      <RadioButtonGroup
        label="Sexo:"
        options={["Masculino", "Femenino", "Personalizado"]}
        selectedOption={formData.sexo}
        onSelectionChange={handleGenderChange}
      />

      <SelectInput
        label="Estado civil"
        id="estado_civil"
        name="estado_civil"
        value={formData.estado_civil}
        onChange={handleInputChange}
        options={[
          { id: "0", nombre: "Soltero" },
          { id: "1", nombre: "Casado" },
          { id: "2", nombre: "Viudo" },
          { id: "3", nombre: "Divorciado" },
        ]}
      />
      <TextInput
        label="Dirección"
        id="direccion"
        name="direccion"
        value={formData.direccion}
        onChange={handleInputChange}
        placeholder="Escriba su dirección"
      />
      <DateInput
        label="Fecha de Nacimiento"
        id="fecha_nacimiento"
        name="fecha_nacimiento"
        value={formData.fecha_nacimiento}
        onChange={handleInputChange}
      />

      <SelectInput
        label="Grupo sanguíneo"
        id="grupo_sangre"
        name="grupo_sangre"
        value={formData.grupo_sangre}
        onChange={handleInputChange}
        options={[
          { id: "0", nombre: "O+" },
          { id: "1", nombre: "O-" },
          { id: "2", nombre: "A+" },
          { id: "3", nombre: "A-" },
          { id: "4", nombre: "B+" },
          { id: "5", nombre: "B-" },
          { id: "6", nombre: "AB+" },
          { id: "7", nombre: "AB-" },
        ]}
      />
      <EmailInput
        label="Correo electrónico"
        id="correo"
        name="correo"
        value={formData.correo}
        onChange={handleInputChange}
      />

      <PasswordInput
        id="password"
        name="password"
        label="Contraseña"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Escriba su contraseña"

      />
      <PasswordInput
        id="confirm_password"
        name="confirm_password"
        label="Confirmar contraseña"
        value={formData.confirm_password}
        onChange={handleInputChange}
        placeholder="Escriba de nuevo contraseña"
      />
      <ImageInput
        label="Imagen del paciente"
        classColor="bg-primary"
        onChange={handleImageChange}
        currentImage={formData.imagen || ""} // Maneja el cambio de imagen
      />
      <RadioButtonGroup
        label="Estado"
        options={["Activo", "Inactivo"]}
        selectedOption={formData.activo}
        onSelectionChange={handleStatusChange}

      />

    </>
  );
};

export default InputsFormPaciente;
