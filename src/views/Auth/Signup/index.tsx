import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import ButtonForm from "../../../components/Botones/ButtonForm";
import InputsFormSignup from "../../../components/Formularios/Signup/InputsFormSignup";
import MainLayoutAuth from "../../../components/MainLoyout/MainLayoutAuthSignup";
import ModalError from "../../../components/Modal/ModalError";
// import { addPatient } from "../../../store/slices/pacienteSlice";
// import { useDispatch } from "react-redux";
import axios from "axios";

const Signup = () => {
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // form
  const [formData, setFormData] = useState({
    numero_documento: "",
    nombre: "",
    telefono: "",
    correo: "",
    password: "",
    tipo: "1",
  });
  
  
  const handleSubmit = () => {
   
    const newUser = {
      numero_documento: formData.numero_documento,
      nombres: formData.nombre,
      telefono: formData.telefono,
      correo:formData.correo,
      password:formData.password,
      tipo : '1'
    };

    const isFilled = areAllStringFieldsFilled(newUser);

    if (isFilled) {
      try {
        axios.post('http://127.0.0.1:8000/usuarios/agregarusuario', newUser)
        .then((response) => {
          // Verificar la respuesta del servidor
          if (response.status >= 200 && response.status < 300) {

            navigate("/");
            // Despachar la acción para actualizar el estado en Redux
             // Ajusta según la estructura de tu acción
            // Otra lógica si es necesario
          } else {
            setModalMessage("¡Ocurrió un error! Inténtalo más tarde");
            setIsShowModalError(true);
          }
        })
        .catch((error) => {
          setModalMessage("¡Ocurrió un error! Inténtalo más tarde");
          setIsShowModalError(true);
          console.error('Error en la solicitud:', error);
        });
        // dispatch(addPatient({ ...newObjeto, registration_date: fecha }));
        // logica ingreso

        
      } catch (error) {
        setModalMessage("¡ocurrio un error!, inténtalo más tarde");
        setIsShowModalError(true);
        console.log(error);
      }
    } else {
      setModalMessage(
        "¡Error! asegurece de llenar correctamente todos los campos por favor"
      );
      setIsShowModalError(true);
    }
  };
  // verificar si los campos estan vacios
  function areAllStringFieldsFilled(obj: { [key: string]: string }) {
    return Object.values(obj).every(
      (val) => typeof val !== "string" || val !== ""
    );
  }

  return (
    <MainLayoutAuth
      title="Regístrate"
      children={
        <>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-auto h-96">
            <InputsFormSignup formData={formData} setFormData={setFormData} />
            <div className="flex gap-2 md:col-span-2">
              <input type="checkbox" name="term" id="term"/>
              <label htmlFor="term">
                Acepto los{" "}
                <Link to={"#"}>
                  <strong>Términos y Condiciones</strong>
                </Link>{" "}
                y la{" "}
                <Link to={"#"}>
                  <strong>Política de cookies</strong>
                </Link>
                .
              </label>
            </div>
            <div className="md:col-span-2 text-center">
              <ButtonForm
                label="Registrarse"
                classColor="bg-primary  w-[70%] rounded"
                onClick={handleSubmit}
              />
            </div>
          </form>
          <p className="text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link className="text-[#009EFB]" to={"/"}>
              Inicia Sesión
            </Link>
          </p>
          <ModalError
            isShowModalError={isShowModalError}
            setIsShowModalError={setIsShowModalError}
            message={modalMessage}
          />
        </>
      }
    />
  );
};
export default Signup;
