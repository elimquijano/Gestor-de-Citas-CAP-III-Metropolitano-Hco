import { FaChevronUp, FaTrash } from "react-icons/fa";

import ButtonComun from "../Botones/ButtonComun";
import TimeInput from "./TimeInput";
import { useState } from "react";

const ButtonsDay: React.FC<{
  text: string;
  onClick: () => void;
  isSelected: boolean;
  numberNotification: number;
}> = ({ text, onClick, isSelected, numberNotification }) => {
  return (
    <button
    type="button"
      onClick={onClick}
      className={`relative p-2 text-center border-2 rounded-lg ${
        isSelected ? "bg-primary text-white" : ""
      }`}
    >
      <p>{text}</p>
      {numberNotification > 0 ? (
        <div className="absolute bg-danger text-white rounded-full -top-2 -right-2  text-xs w-5 h-5 flex justify-center items-center">
          {numberNotification}
        </div>
      ) : (
        ""
      )}
    </button>
  );
};

interface HorarioProps {
  label: string;
  horario: { dias_semana: string; entrada: string; salida: string }[];
  setHorario: (
    nuevoHorario: { dias_semana: string; entrada: string; salida: string }[]
  ) => void;
}

const HorarioInput: React.FC<HorarioProps> = ({
  label,
  horario,
  setHorario,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenAdd, setIsHiddenAdd] = useState(true);
  const [daySelected, setDaySelected] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [isShowAlert, setIsShowAlert] = useState(false);
  const dias = [
    { index: "1", value: "Lunes" },
    { index: "2", value: "Martes" },
    { index: "3", value: "Miércoles" },
    { index: "4", value: "Jueves" },
    { index: "5", value: "Viernes" },
    { index: "6", value: "Sábado" },
    { index: "7", value: "Domingo" },
  ];
  return (
    <div className="w-full">
      <label htmlFor="" className="block">
        {label}:
      </label>

      {/* botones */}
      <div className="w-full mt-2 flex flex-col md:flex-row gap-2">
        {dias.map((dia, i) => (
          <ButtonsDay
            text={dia.value}
            key={i}
            isSelected={daySelected === dia.value}
            onClick={() => {
              setDaySelected(dia.value);
              setIsHidden(false);
            }}
            numberNotification={
              horario.filter((horario) => horario.dias_semana === dia.value).length
            }
          />
        ))}
      </div>

      {/* horario */}
      <div className={`${isHidden ? "hidden" : ""} w-full border-2 p-2`}>
        <div className="text-end">
          <button
            type="button"
            onClick={() => {
              setIsHidden(true);
              setDaySelected("");
            }}
          >
            <FaChevronUp />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {horario
            .filter((horario) => horario.dias_semana === daySelected)
            .map((turn, i) => (
              <div className="flex justify-between border-2 p-2" key={i}>
                <p>
                  {turn.dias_semana}: {turn.entrada} - {turn.salida}
                </p>
                <button
                  type="button"
                  className="p-1 rounded-lg bg-danger text-white"
                  onClick={() => {
                    const indice = horario.findIndex(
                      (h) =>
                        h.dias_semana === turn.dias_semana &&
                        h.entrada === turn.entrada &&
                        h.salida === turn.salida
                    );
                    // Eliminar el horario del array
                    horario.splice(indice, 1);
                    setHorario(horario);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
        </div>
        <div className="text-center p-2">
          <ButtonComun
            text="Agregar Nuevo Horario"
            classColor="bg-success"
            onClick={() => {
              isHiddenAdd ? setIsHiddenAdd(false) : setIsHiddenAdd(true);
            }}
          />
        </div>

        {/* agregar */}
        <div
          className={`flex flex-col gap-2 border-2 p-2 ${
            isHiddenAdd ? "hidden" : ""
          }`}
        >
          {isShowAlert ? (
            <div className="p-2 bg-danger text-white">Rellene los campos</div>
          ) : (
            ""
          )}
          <TimeInput
            id="inicio"
            label="Hora de inicio"
            name="inicio"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
            ) => {
              setInicio(e.target.value);
            }}
            value={inicio}
            required={false}
          />
          <TimeInput
            id="fin"
            label="Hora de fin"
            name="fin"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
            ) => {
              setFin(e.target.value);
            }}
            value={fin}
            required={false}
          />
          <div className="text-end">
            <ButtonComun
              classColor="bg-success"
              text="Guardar"
              onClick={() => {
                if (inicio !== "" && fin !== "") {
                  setHorario([
                    ...horario,
                    { dias_semana: daySelected, entrada: inicio, salida: fin },
                  ]);
                  setInicio("");
                  setFin("");
                  setIsShowAlert(false);
                } else 
                {
                  setIsShowAlert(true);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorarioInput;
