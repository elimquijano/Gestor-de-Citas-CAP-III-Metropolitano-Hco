import React from "react";

const CardGraphic: React.FC<{
  title: string;
  colSpan?: string;
  childGraphic: React.ReactNode;
}> = ({ title, colSpan=2, childGraphic }) => {
  return (
    <div
      className={`border-2 shadow-lg overflow-hidden col-span-1 md:col-span-${colSpan} p-4 flex flex-col rounded-lg`}
    >
      <h4 className="uppercase font-semibold h-auto">{title}</h4>
      <div className="p-4 flex justify-center items-center flex-grow">{childGraphic}</div>
    </div>
  );
};

export default CardGraphic;
