// import EmailInput from "../../Inputs/EmailInput";
import PasswordInput from "../../Inputs/PasswordInput";
import TextInput from "../../Inputs/TextInput";
import EmailInput from "../../Inputs/EmailInput";

interface InputsFormSignupProps {
  formData: {
    numero_documento:string;
    nombre: string;
    correo: string;
    telefono: string;
    password: string;
    tipo :string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      numero_documento:string;
      nombre: string;
      correo: string;
      telefono: string;
      password: string;
      tipo:string;
    }>
  >;
}

// formulario hijo(solo inputs)

const InputsFormSignup = ({ formData, setFormData }: InputsFormSignupProps) => {
 
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <TextInput
        label="Numero de documento de Identidad"
        id="numero_documento"
        name="numero_documento"
        value={formData.numero_documento}
        onChange={handleInputChange}
        placeholder="Ingrese su DNI"
      />
      
      <TextInput
        label="Nombres"
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        placeholder="Ingrese su Nombre"
      />
      <EmailInput
        label="Correo electrónico"
        id="correo"
        name="correo"
        value={formData.correo}
        onChange={handleInputChange}
      />

      <TextInput
        label="Telefono /Celular "
        id="telefono"
        name="telefono"
        value={formData.telefono}
        onChange={handleInputChange}
        placeholder="+51"
      />

      <PasswordInput
        id="password"
        label="Contraseña"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Ingrese su contraseña"
      />
    </>
  );
};

export default InputsFormSignup;
