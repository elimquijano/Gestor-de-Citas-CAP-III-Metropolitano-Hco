import { FaExclamationCircle } from "react-icons/fa";
import ButtonComun from "../Botones/ButtonComun";

interface ModalErrorProps {
  isShowModalError: boolean;
  setIsShowModalError: React.Dispatch<
    React.SetStateAction<ModalErrorProps["isShowModalError"]>
  >;
  message: string;
}

const ModalError: React.FC<ModalErrorProps> = ({
  isShowModalError,
  setIsShowModalError,
  message,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-[#0000007a] flex items-center justify-center p-2 ${
        isShowModalError ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-6 rounded bg-white p-6 text-center overflow-auto">
        <i className="text-[#DD3242] text-8xl flex justify-center">
          <FaExclamationCircle />
        </i>
        <strong className="text-xl">{message}</strong>
        <div>
          <ButtonComun
            text="OK"
            onClick={() => {
              setIsShowModalError(false);
            }}
            classColor="bg-danger"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalError;
