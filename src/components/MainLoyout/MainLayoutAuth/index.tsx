import IconEsSalud from "../../../assets/LoginImg/Logo_EsSalud.png";
import React from "react";
import backgroundImage from "../../../assets/LoginImg/fondo_salud.png"

const MainLayoutAuth: React.FC<{
  title: string;
  children?: React.ReactNode;

}> = ({ title, children }) => 
{
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Ajusta la altura según tus necesidades
    overflow: 'auto',
    display: 'flex',
  };

  return (
    <div>
    <div style={containerStyle}>

      <div className="h-screen w-[200%]  bg-[#00000020] flex-col md:flex-row items-center justify-start hidden md:flex md:items-center p-12 ">
        <div className="rounded-lg flex">
        <div className="flex-col hidden md:flex items-center justify-center ">
          <img className="w-[42%] py-3" src={IconEsSalud} alt="logo EsSalud" />
          <p className=" text-lg fw- text-white px-3 py-5 text-center">
          En  <span className="font-semibold text-center">  CAP III Metropolitano EsSalud</span>, facilitamos la gestión de tus citas médicas.
          Agendar tu cita nunca ha sido tan fácil y rápido.
          ¡Cuida de tu salud de manera conveniente!
        </p>
          <h3 className="text-3xl font-bold text-white shadow-md items-center justify-center py-5">
          "Cuidando tu salud con el compromiso de siempre."
        </h3>
        
        </div>
        <div className="p-6  flex flex-col gap-6">
      <div className="flex flex-col gap-7 ">

       
      </div>

    </div>
          
        </div>   
      </div>


      <div className="h-screen w-[100%]   bg-[#00000020] flex flex-col md:flex-row items-center justify-center  p-2 ">
        <div className="rounded-lg bg-[#ffff] flex shadow-md ">
          <div className="p-6  flex flex-col gap-6">
            <div className="flex flex-col gap-4 ">
              <div>
                <div className="p-2  md:flex justify-center items-center  md:items-center pt-4 ">
                  <img className="w-60 " src={IconEsSalud} alt="logo EsSalud" />
                </div>
                <hr />
                <div className="pt-5">
                  <h4 className="text-3xl font-bold text-center pb-2 mb-4 border-b-4 border-[#009EFB] text-[#009EFB]">
                    <span className="bg-white px-4">{title}</span>
                  </h4>
                </div>
                
              </div>
              {children}
             
              <hr />
             <span className=" italic font-bold"> Contactanos : <span className=" text-[#009EFB]">consultas.viva@essalud.gob.pe</span></span> 
              <hr />
              <span className="shadow-3xl italic font-bolder px-4"> "Agenda tus citas con nosotros y prioriza tu bienestar"</span>
            </div>
            
          </div>

          
        </div>
        
      </div>
      
    </div>
    
  </div>
  );

};

export default MainLayoutAuth;

