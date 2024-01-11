import { FaCheckCircle } from "react-icons/fa";
import ButtonComun from "../Botones/ButtonComun";

interface ModalSuccesProps {
  isShowModalSuccess: boolean;
  setIsShowModalSuccess: React.Dispatch<
    React.SetStateAction<ModalSuccesProps["isShowModalSuccess"]>
  >;
  message: string;
}

const ModalSucces: React.FC<ModalSuccesProps> = ({
  isShowModalSuccess,
  setIsShowModalSuccess,
  message,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-[#0000007a] flex items-center justify-center p-2 ${
        isShowModalSuccess ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-6 rounded bg-white p-6 text-center overflow-auto">
        <i className="text-[#2AA53D] text-8xl flex justify-center">
          <FaCheckCircle />
        </i>
        <strong className="text-xl">{message}</strong>
        <div>
          <ButtonComun
            text="OK"
            onClick={() => {
              setIsShowModalSuccess(false);
            }}
            classColor="bg-success"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalSucces;
