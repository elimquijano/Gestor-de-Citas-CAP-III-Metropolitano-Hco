import React from "react";

interface CardDash {
  title: string;
  date: string;
  quantity: string;
  color: string;
}

const CardDashboard: React.FC<CardDash> = ({
  title,
  date,
  quantity,
  color,
}) => {
  return (
    <div className="border-2 shadow-lg overflow-hidden text-start rounded-lg">
      <div className="p-4 grid grid-cols-1 gap-2">
        <h2 className="uppercase font-semibold text-1xl">{title}</h2>
        <p className="text-[#6c757d]">{date}</p>
        <h6 className="font-semibold text-2xl">{quantity}</h6>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280">
        <path
          fill={color}
          d="M0,128L18.5,133.3C36.9,139,74,149,111,160C147.7,171,185,181,222,197.3C258.5,213,295,235,332,208C369.2,181,406,107,443,90.7C480,75,517,117,554,133.3C590.8,149,628,139,665,160C701.5,181,738,235,775,229.3C812.3,224,849,160,886,144C923.1,128,960,160,997,170.7C1033.8,181,1071,171,1108,149.3C1144.6,128,1182,96,1218,90.7C1255.4,85,1292,107,1329,101.3C1366.2,96,1403,64,1422,48L1440,32L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default CardDashboard;
