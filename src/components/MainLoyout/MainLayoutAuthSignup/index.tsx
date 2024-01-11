import React from "react";
import IconEsSalud from "../../../assets/LoginImg/Logo_EsSalud.png";
import backgroundImage from "../../../assets/LoginImg/fondo_salud.png"

const MainLayoutAuthSignup: React.FC<{
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

      <div className="h-screen w-screen bg-[#00000020] flex items-center justify-center overflow-auto">
        <div className="rounded-lg bg-[#ffff] flex rounded shadow-md overflow-auto ">
          <div className="p-6  flex flex-col gap-6">
            <div className="flex flex-col gap-10 overflow-auto">
              <div>
                <div className="p-2  md:flex justify-center items-center  md:items-center pt-4 ">
                  <img className="w-60 " src={IconEsSalud} alt="logo EsSalud" />
                </div>
                <hr/>

                <div className="pt-5">
                  <h4 className="text-3xl font-bold text-center pb-2 mb-4 border-b-4 border-[#009EFB] text-[#009EFB]">
                    <span className="bg-white px-4">{title}</span>
                  </h4>
                </div>  
              </div>
              {children}

            </div>
            
          </div>

          
        </div>
        
      </div>
      
    </div>
    
  </div>
  );

};

export default  MainLayoutAuthSignup;