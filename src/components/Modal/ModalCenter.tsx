import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleModal } from "../../store/slices/mainLayoutSlice";

interface ModalCenterProps {
  modalChildren: React.ReactNode;
}

const ModalCenter: React.FC<ModalCenterProps> = ({ modalChildren }) => {
  const dispatch = useDispatch();
  const isShowModal = useSelector(
    (state: RootState) => state.mainLayout.isShowModal
  );
  const toggleVisibility =()=>{
    dispatch(toggleModal());
  }
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-[#0000007a] flex items-center justify-center p-2 overflow-auto ${
        isShowModal ? "" : "hidden"
      }`}
    >
      <div className="rounded bg-white overflow-auto">
        <div className="flex justify-end items-center overflow-auto">
          <button onClick={toggleVisibility} className="px-4 py-2 overflow-auto">
            <h4 className="font-bold">X</h4>
          </button>
        </div>
        <div className="p-2 overflow-auto">{modalChildren}</div>
      </div>
    </div>
  );
};

export default ModalCenter;
