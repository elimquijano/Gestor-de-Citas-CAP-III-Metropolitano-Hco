import { memo, useState } from 'react';
import { format, addHours, isPast } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

import Modal from './Modal';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../shared/hooks';

const AvailableHours = memo(({ freeTimes, selectedDepartment }: { freeTimes: { time: Date, isReserved: boolean, doctorCode: number }[], selectedDepartment: number }) => {
  const [selectedTime, setSelectedTime] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });




  console.log(selectedDepartment);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null); // Estado para el botón seleccionado

  const openModal = (buttonIndex: number) => {
    setSelectedButtonIndex(buttonIndex); // Al abrir el modal, establece el botón seleccionado
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedButtonIndex(null); // Al cerrar el modal, deselecciona el botón
    setIsModalOpen(false);
  };


  const doctorColors = useAppSelector((state: RootState) => state.citasSlice.doctorColors);
  console.log('freetimes');
  console.log(freeTimes);

  return (
    <div className="flex flex-col items-center gap-2 mt-4 p-4">
      <span>
        Horas disponibles:{' '}
      </span>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 text-md gap-2">
      {freeTimes.map((timeObj, hourIdx) => {
  const startTime = timeObj.time;
  const endTime = addHours(startTime, 1);
  const isButtonSelected = selectedButtonIndex === hourIdx;
  const isPastTime = isPast(endTime);
  const isAvailable = !timeObj.isReserved && !isPastTime;
  const doctorColor = doctorColors[timeObj.doctorCode];

  return (
    <div key={hourIdx}>
      <button
        type="button"
        className={cn(
          'rounded-lg px-2 py-4 relative border hover:border hover:border-green-400',
          isButtonSelected
          ? (isPastTime ? 'bg-red-400 text-gray-800 opacity-40' : 'bg-green-400 text-gray-800')
          : isAvailable
          ? 'bg-green-200 text-gray-800'
          : (isPastTime ? 'bg-green-200 text-gray-800 opacity-40' : 'bg-red-200 text-gray-800')
        )}
        style={{ backgroundColor: isAvailable ? doctorColor : undefined }}
        onClick={() => {
          setSelectedTime({ start: startTime, end: endTime });
          openModal(hourIdx);
        }}
        disabled={!isAvailable}
      >
        <CheckCircle2
          className={cn(
            'absolute hidden -top-2 -right-2 text-green-700',
            isButtonSelected && 'block'
          )}
        />
        {`${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`}
      </button>
    </div>
  );
})}
      </div>
      {isModalOpen && (
        <Modal
          selectedTime={selectedTime}
          closeModal={closeModal}
          selectedDepartment={selectedDepartment}
        />
      )}
    </div>
  );
});

export default AvailableHours;