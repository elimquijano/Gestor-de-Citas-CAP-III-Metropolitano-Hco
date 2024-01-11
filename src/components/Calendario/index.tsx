import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import {
  add,

  addMinutes,
  areIntervalsOverlapping,
  eachDayOfInterval,


  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isThisMonth,
  isToday,
  isValid,

  parse,
  set,

  startOfToday,
  startOfWeek,
  startOfYesterday
} from "date-fns"
import { cn, dayNames } from "./lib/utils.ts"
// Importamos las librerías y componentes necesarios
import { useEffect, useMemo, useState } from "react"

import AvailableHours from "./components/hours"
import TimesBar from "./components/timesBar"
import { es } from "date-fns/locale";
import { useAppDispatch, useAppSelector } from "../../shared/hooks.tsx"
import { fetchDoctors } from "../../store/slices/doctorSlice/index.tsx"
import { fetchReservations } from "../../store/slices/citasSlice/index.tsx"

interface Cita {
  id: number;
  cod_paciente: number | null;
  cod_doctor: number | null;
  cod_departamento: number | null;
  fecha: string | null;
  hora_inicio: string | null;
  hora_fin: string | null;
  activo: 'S' | 'N';
}

interface CalendarioProps {
  reservations: Cita[];
  selectedDepartment: number;
  selectedDoctor: string | null;
}

const Calendario: React.FC<CalendarioProps> = ({ reservations, selectedDepartment, selectedDoctor }) => {
  console.log('doctor seleccionado');

  console.log(selectedDoctor);



  const doctors = useAppSelector(state => state.doctorSlice.doctors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const doctorsInDepartment = doctors.filter(doctor =>
    doctor.cod_departamento.toString() === selectedDepartment.toString() &&
    (selectedDoctor === null || doctor.id === selectedDoctor)
  );
  console.log(doctorsInDepartment);

  const horariosDoctoresXdepartamento = doctorsInDepartment.flatMap(doctor => doctor.horarios);
  console.log('orariosDoctoresXdepartamento');
  console.log(horariosDoctoresXdepartamento);



  const [calendarTouched, setCalendarTouched] = useState<boolean>(false)

  const [selectedDay, setSelectedDay] = useState(new Date());

  useEffect(() => {
    setSelectedDay(new Date());
  }, [selectedDoctor, selectedDepartment]);


  const today = startOfToday()
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())

  const days = useMemo(() => eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  }), [firstDayCurrentMonth])




  function prevMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  // Formatea el día seleccionado a su nombre en español y en minúsculas
  const dayOfWeek = format(selectedDay, 'EEEE', { locale: es }).toLowerCase();

  interface Schedule {
    dias_semana: string;
    entrada: string;
    salida: string;
    cod_doctor: number;
    // Agreg
  }


  // Filtra los horarios de los doctores que coinciden con el día de la semana seleccionado
  let doctorSchedulesOnSelectedDay = useMemo(() => {
    return (horariosDoctoresXdepartamento as Schedule[])
      .filter(schedule => schedule.dias_semana.toLowerCase() === dayOfWeek)

  }, [horariosDoctoresXdepartamento, dayOfWeek, selectedDoctor]);
  // Define el paso como 60, que representa la duración de cada intervalo de tiempo en minutos
  const step = 60; // Duración del intervalo en minutos

  // ... (otro código)


  const freeTimes = useMemo(() => {

    const filteredHours = doctorSchedulesOnSelectedDay.flatMap(schedule => {
      const scheduleStart = parse(format(selectedDay, 'yyyy-MM-dd') + ", " + schedule.entrada, 'yyyy-MM-dd, HH:mm', new Date());
      const scheduleEnd = parse(format(selectedDay, 'yyyy-MM-dd') + ", " + schedule.salida, 'yyyy-MM-dd, HH:mm', new Date());

      if (isValid(scheduleStart) && isValid(scheduleEnd)) {
        const hoursInSchedule = [];
        let currentStart = scheduleStart;

        while (isBefore(currentStart, scheduleEnd)) {
          const currentEnd = addMinutes(currentStart, step);

          // Si el final del intervalo supera el horario del doctor, ajustamos al final del horario
          const adjustedEnd = isAfter(currentEnd, scheduleEnd) ? scheduleEnd : currentEnd;

          // Solo agregamos el intervalo si comienza antes del final ajustado
          if (isBefore(currentStart, adjustedEnd)) {
            hoursInSchedule.push({ start: currentStart, end: adjustedEnd });
          }

          currentStart = addMinutes(currentStart, step);
        }

        // Mapear cada intervalo de tiempo a un objeto que indica si está reservado o disponible
        return hoursInSchedule.map(interval => {
          const isReserved = reservations.some(reservation => {
            const reservationStart = parse(reservation.fecha + ", " + reservation.hora_inicio, 'yyyy-MM-dd, HH:mm', new Date());
            const reservationEnd = parse(reservation.fecha + ", " + reservation.hora_fin, 'yyyy-MM-dd, HH:mm', new Date());
            return isValid(reservationStart) && isValid(reservationEnd) && areIntervalsOverlapping(interval, { start: reservationStart, end: reservationEnd });
          });
          return { time: interval.start, isReserved, isAvailable: !isReserved, doctorCode: schedule.cod_doctor };
        });
      }
      return [];
    });

    // Filtrar los intervalos de tiempo que están disponibles
    return filteredHours.filter(hour => hour.isAvailable);

  }, [selectedDay, reservations, doctorSchedulesOnSelectedDay, step]);


  console.log(freeTimes);

  console.log('reservations');
  console.log(reservations);



  // Calcula la disponibilidad de horas para cada día
  // Calcula la disponibilidad de horas para cada día
  const [availableTimesInThisMonth, availableTimesInThisMonthForEachDay] = useMemo(() => {
    const timesLength: number[] = [];
    const timesEachDay: Date[][] = days.map((day) => {
      // Aquí necesitamos calcular los horarios para cada día, no solo el día seleccionado
      const dayOfWeek = format(day, 'EEEE', { locale: es }).toLowerCase();
      const daySchedules = horariosDoctoresXdepartamento.filter(schedule => schedule.dias_semana.toLowerCase() === dayOfWeek);

      const dayHours = daySchedules.flatMap(schedule => {
        const scheduleStart = set(day, { hours: parseInt(schedule.entrada.split(':')[0]), minutes: parseInt(schedule.entrada.split(':')[1]) });
        const scheduleEnd = set(day, { hours: parseInt(schedule.salida.split(':')[0]), minutes: parseInt(schedule.salida.split(':')[1]) });
        let hoursInSchedule: Date[] = [];
        let currentStart = scheduleStart;

        while (isBefore(currentStart, scheduleEnd)) {
          const currentEnd = addMinutes(currentStart, step);
          if (isAfter(currentEnd, scheduleEnd)) {
            break;
          }
          hoursInSchedule.push(currentStart);
          currentStart = currentEnd;
        }

        // Filtrar los horarios que ya están reservados
        hoursInSchedule = hoursInSchedule.filter(hour => {
          const hourEnd = addMinutes(hour, step);
          return !reservations.some(reservation =>
            areIntervalsOverlapping(
              { start: parse(`${reservation.fecha} ${reservation.hora_inicio}`, 'yyyy-MM-dd HH:mm', new Date()), end: parse(`${reservation.fecha} ${reservation.hora_fin}`, 'yyyy-MM-dd HH:mm', new Date()) },
              { start: hour, end: hourEnd }
            )
          );
        });

        return hoursInSchedule;
      });

      timesLength.push(dayHours.length);
      return dayHours;
    });

    return [timesLength, timesEachDay];
  }, [currentMonth, horariosDoctoresXdepartamento, step, selectedDoctor, reservations]); // Aquí agregamos selectedDoctor a las dependencias//********************************************************************************** */


  // Initialize selectedDay state with the first day that has available hours




  return (
    <div className="flex flex-col lg:flex-row p-10 justify-center items-center gap-16 bg-stone-50">
      <div className="flex flex-col gap-2 h-3/4 w-2/4 ">
        <div className="grid grid-cols-3">
          <button
            type="button"
            onClick={prevMonth}
            disabled={isThisMonth(new Date(currentMonth))}
          >
            <ChevronLeft
              size={20}
              aria-hidden="true"
              className={cn(
                isThisMonth(new Date(currentMonth)) && "text-gray-300"
              )}
            />
          </button>
          <h2 className="font-semibold text-orange-950 justify-center flex">
            {format(firstDayCurrentMonth, " MMMM yyyy", { locale: es })}
          </h2>
          <button
            type="button"
            className="flex justify-end"
            onClick={nextMonth}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
        <div>
          <div className="grid grid-cols-7 mt-4">
            {dayNames.map((day, i) => {
              return (
                <div
                  key={i}
                  className={cn(
                    "flex justify-center items-center text-sm text-blue-500 w-full py-2",
                    {
                      "text-orange-400 bg-orange-50 rounded-t-lg":
                        day === "Sun" || day === "Sat",
                    }
                  )}
                >
                  {day}
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-7 text-sm">
            {days.map((day, dayIdx) => {

              const hasAvailableHours = availableTimesInThisMonth[dayIdx] > 0;
              console.log(hasAvailableHours);

              return (
                <div
                  key={day.toString()}
                  className={cn(
                    dayIdx === 0 && colStartClasses[getDay(day) - 1],
                    "h-14 justify-center flex items-center",
                    (getDay(day) === 0 || getDay(day) === 6) &&
                    "bg-orange-50 rounded-lg",


                  )}
                >
                  <button
                    onClick={() => {

                      if (hasAvailableHours) {
                        setCalendarTouched(true)
                        setSelectedDay(day)
                      }

                    }


                    }
                    className={cn(
                      "w-12 h-12 flex flex-col p-2 justify-center items-center rounded-lg gap-0 group bg-green-200 relative group",
                      isEqual(day, selectedDay) &&
                      "bg-orange-100 text-slate-900 text-lg",
                      isEqual(today, day) && "text-blue-900 bg-blue-200",
                      isBefore(day, today) &&
                      "text-red-800 bg-slate-200 cursor-not-allowed",
                      isEqual(today, day) && "text-blue-900 bg-blue-200",
                      isBefore(day, today) && "cursor-not-allowed",
                      isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-blue-200",
                      !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                      !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                      !hasAvailableHours && !isBefore(day, today) && !isEqual(day, today) && "bg-slate-500 text-slate-300 cursor-not-allowed" // Añade la comprobación !isEqual(day, today)
                    )}

                    disabled={isBefore(day, today)}
                  >
                    {isAfter(day, startOfYesterday()) && (
                      <span className="hidden group-hover:flex absolute top-0 -translate-x-.5 -translate-y-4 z-10 text-[11px] bg-slate-900 text-slate-100 px-1 rounded-lg gap-1">
                        <span>{availableTimesInThisMonth[dayIdx]}</span>
                        <span>Available</span>
                      </span>
                    )}
                    <time
                      dateTime={format(day, "yyyy-MM-dd")}
                      className={cn(
                        "group-hover:text-lg",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold"
                      )}
                    >
                      {format(day, "d")}
                    </time>
                    <CheckCircle2
                      className={cn(
                        "hidden",
                        isEqual(day, selectedDay) &&
                        "absolute block top-0 right-0 h-[18px] w-[18px] translate-x-1 -translate-y-1 text-orange-900",
                        isEqual(day, today) && "text-blue-900"
                      )}
                    />
                    {isAfter(day, startOfYesterday()) && (
                      <TimesBar
                        times={availableTimesInThisMonthForEachDay[dayIdx]}
                      />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {freeTimes.length !== 0 ?
        <div className={cn(`hidden`, calendarTouched && "block")}>
          <span className="flex items-center w-full justify-center gap-1">
            <span>
              Seleccione su cita para el
              <span className="text-orange-950 font-semibold pl-1">
                {format(selectedDay, "dd MMMM yyyy", { locale: es }).toString()}
              </span>
            </span>
          </span>
          <AvailableHours freeTimes={freeTimes} selectedDepartment={selectedDepartment} />
        </div> : <span className="text-center text-base animate-pulse">Antes de continuar seleccione algún día disponible en el calendario 🗓️</span>}
    </div>
  )
};

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]

export default Calendario;




