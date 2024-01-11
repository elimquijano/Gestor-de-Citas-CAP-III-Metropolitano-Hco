// import EmailInput from "../../Inputs/EmailInput";
import PasswordInput from "../../Inputs/PasswordInput";
import TextInput from "../../Inputs/TextInput";

interface InputsFormLoginProps {
  formData: {
    numero_documento: string;
    password: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{ numero_documento: string; password: string }>
  >;
}

// formulario hijo(solo inputs)

const InputsFormLogin = ({ formData, setFormData }: InputsFormLoginProps) => {
 
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

export default InputsFormLogin;
