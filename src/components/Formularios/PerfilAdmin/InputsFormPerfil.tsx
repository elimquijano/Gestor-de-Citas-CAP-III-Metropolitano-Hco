import EmailInput from "../../Inputs/EmailInput";
import ImageInput from "../../Inputs/ImageInput";
import PasswordInput from "../../Inputs/PasswordInput";
import TextInput from "../../Inputs/TextInput";

interface InputsFormPerfil {
  formData: {
    name: string;
    lastname: string;
    email: string;
    password: string;
    image: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<InputsFormPerfil["formData"]>
  >;
}

// formulario hijo(solo inputs)

const InputsFormPerfil = ({ formData, setFormData }: InputsFormPerfil) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const imageData = e.target.result as string; // Obtiene los datos de la imagen como una cadena base64
          setFormData({ ...formData, image: imageData });
        }
      };
      reader.readAsDataURL(file);
    } else {
      // No se seleccionó ninguna imagen
      setFormData({ ...formData, image: "" }); // Puedes establecer el valor de imagen como vacío o null según tu preferencia
    }
  };
  return (
    <>
      <TextInput
        label="Nombres"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextInput
        label="Apellidos"
        id="lastname"
        name="lastname"
        value={formData.lastname}
        onChange={handleInputChange}
      />
      <EmailInput
        label="Correo electrónico"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />

      <PasswordInput
        label="Contraseña"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <ImageInput
        label="Imagen de perfil"
        classColor="bg-primary"
        onChange={handleImageChange} // Maneja el cambio de imagen
      />
    </>
  );
};

export default InputsFormPerfil;
