import React from 'react';
import InputsFormCitas from '../../Formularios/AddCitas/InputsFormCitas';// Asegúrate de importar correctamente

type ModalProps = {
  selectedTime: { start: Date | null; end: Date | null };
  closeModal: () => void;
  selectedDepartment :number
};

const Modal: React.FC<ModalProps> = ({ selectedTime, closeModal, selectedDepartment  }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className='z-50 w-1/2'> <InputsFormCitas selectedTime={selectedTime} closeModal={closeModal}  selectedDepartment ={ selectedDepartment }/></div>
     
      <div
        className="bg-slate-600/30 fixed inset-0 z-30"
        onClick={closeModal} // Cierra el modal al hacer clic en el fondo negro
      ></div>
    </div>
  );
};

export default Modal;