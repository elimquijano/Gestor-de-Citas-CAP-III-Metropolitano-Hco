import TextInput from "../../Inputs/TextInput";
// import SelectInput from "../../Inputs/SelectInput";
import ImageInput from "../../Inputs/ImageInput";
// import { RootState } from "../../../store";
// import { useSelector } from "react-redux";

interface InputsFormDepartamentoProps {
  formData: {
    nombre: string;
    imagen: string;
    descripcion: string;
    encargado: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      nombre: string;
      imagen: string;
      descripcion: string;
      encargado: string;
    }>
  >;
}

// formulario hijo(solo inputs)

const InputsFormDepartamento = ({
  formData,
  setFormData,
}: InputsFormDepartamentoProps) => {
  // const doctors = useSelector(
  //   (state: RootState) => state.doctorSlice.doctors
  // ).map((doctor) => ({
  //   id: String(doctor.id),
  //   nombre: doctor.nombres + " " + doctor.apellidos,
  // }));

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
        label="Nombre del Departamento"
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        placeholder="nombre"
      />
     <TextInput
        label="Encargado del Departamento"
        id="encargado"
        name="encargado"
        value={formData.encargado}
        onChange={handleInputChange}
        placeholder="Encargado"
      />
      <ImageInput
        label="Imagen del Departamento"
        classColor="bg-primary"
        onChange={handleImageChange}
        currentImage= {formData.imagen || "" }
      />
      <TextInput
        label="Descripción del Departamento"
        id="descripcion"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleInputChange}
        placeholder="Descripción"
      />
    </>
  );
};

export default InputsFormDepartamento;