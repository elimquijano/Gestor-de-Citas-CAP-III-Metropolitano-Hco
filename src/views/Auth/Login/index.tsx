import { Link, useNavigate } from "react-router-dom";

import ButtonForm from "../../../components/Botones/ButtonForm";
import InputsFormLogin from "../../../components/Formularios/Login/InputsFormLogin";
import MainLayoutAuth from "../../../components/MainLoyout/MainLayoutAuth";
import axios from "axios";
import{ useState } from "react";

const Login = () => {
  const navigate = useNavigate();


  // datos del formulario login
  const [formData, setFormData] = useState({
    numero_documento: "",
    password: "",
  });

  // state alerta
  const [messageAlert, setMessageAlert] = useState("");

  // funcion enviar
  const handleSubmit = async () => {
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/usuarios/buscarusuario', formData);

      if (response.status === 200) {
        // const data = response.data;
        // dispatch(loginSuccess(data.token));
        navigate('/dashboard/user');

      } else
      {
        setMessageAlert("Su cuenta no existe");
        setTimeout(() => {
          navigate('/dashboard/user');
        }, 2000);
        

      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }



    // if (formData.username !== "" && formData.password !== "") {

    //   // Logica para inicio de sesión
    //   navigate("/dashboard/user");
    // } else {
    //   setMessageAlert("Rellene todos los campos");
    // }

  };


  return (
    <MainLayoutAuth
      title="Iniciar Sesión"
      children={
        <>
          {messageAlert !== "" && (
            <div className="bg-danger p-4 rounded text-white flex justify-between">
              <p>{messageAlert}</p>
              <button
                type="button"
                onClick={() => {
                  setMessageAlert("");
                }}
              >
                X
              </button>
            </div>
          )}
          <form className="flex flex-col gap-6">
            <InputsFormLogin formData={formData} setFormData={setFormData} />
            <ButtonForm
              label="Iniciar Sesión"
              classColor="bg-primary"
              onClick={handleSubmit}
            />
          </form>
          <p className="text-center">
            ¿Aún no tienes una cuenta?{" "}
            <Link className="text-[#009EFB]" to={"/auth/signup"}>
              Registrate
            </Link>
          </p>
        </>
      }
    />
  );
};
export default Login;
