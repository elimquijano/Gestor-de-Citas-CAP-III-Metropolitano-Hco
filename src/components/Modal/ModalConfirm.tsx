import { FaExclamationTriangle } from "react-icons/fa";
import ButtonComun from "../Botones/ButtonComun";

interface ModalConfirmProps {
  isShowModalConfirm: boolean;
  setIsShowModalConfirm: React.Dispatch<
    React.SetStateAction<ModalConfirmProps["isShowModalConfirm"]>
  >;
  onClick: () => void;
  message: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isShowModalConfirm,
  setIsShowModalConfirm,
  onClick,
  message,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-[#0000007a] flex items-center justify-center p-2 ${
        isShowModalConfirm ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-6 rounded bg-white p-6 text-center overflow-auto">
        <i className="text-[#DD3242] text-8xl flex justify-center">
          <FaExclamationTriangle />
        </i>
        <strong className="text-xl">{message}</strong>
        <div className="flex gap-3 justify-center">
          <ButtonComun
            text="SI"
            onClick={onClick}
            classColor="bg-primary"
          />
          <ButtonComun
            text="NO"
            onClick={() => {
              setIsShowModalConfirm(false);
            }}
            classColor="bg-danger"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
