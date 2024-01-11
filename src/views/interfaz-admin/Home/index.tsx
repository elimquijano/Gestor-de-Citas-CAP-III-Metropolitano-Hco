import { AiFillAppstore } from "react-icons/ai";
import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import CardDashboard from "../../../components/Cards/CardDashboard";
import CardTable from "../../../components/Cards/CardTable";
import CardGraphic from "../../../components/Cards/CardGraphic";
import BarGraphic from "../../../components/Graficos/Bar";
import PieGraphic from "../../../components/Graficos/Pie";
import { useAppSelector } from "../../../shared/hooks";

const AdminHome = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   // Verifica si el token de acceso está presente en localStorage
  //   const storedToken = localStorage.getItem('access_token');
  //   if (storedToken) {
  //     const access_token = JSON.parse(storedToken);
  //     // Ahora, `access_token` debería contener el objeto si `storedToken` no es nulo
  //     // Realiza las operaciones necesarias con `access_token`
  //     if (!access_token) {
  //       // Si no hay token, redirige al usuario a la página de inicio de sesión
  //       console.log('Redirigiendo a la página de inicio de sesión');
  //       navigate('/admin');
  //     }
  //   } else {
  //     navigate('/auth');
  //   }
  // }, [navigate]);
  // main layout
  const navigationItems = [{ to: "/", text: "Home", icon: <AiFillAppstore /> }];

  //home
  const doctors = useAppSelector((state) => state.doctorSlice.doctors);
  const patients = useAppSelector((state) => state.pacienteSlice.patients);
  const reservations = useAppSelector((state) => state.citasSlice.reservations);

  // table doctors hability
  const columnNamesDoctor = ["doctor", "especialidad", "estado"];
  const doctors_hability_data = doctors.map((doctor) => ({
    nombre: doctor.nombres + " " + doctor.apellidos,
    especialidad: doctor.cod_especialidad,
    estado: doctor.activo === "S" ? "Activo" : "Inactivo",
  }));

  // table patients information
  const columnNamesPatient = ["paciente", "teléfono", "estado"];
  const patient_information_data = patients.map((patient) => ({
    nombre: patient.nombres + " " + patient.apellido_paterno,
    teléfono: patient.telefono,
    estado: patient.activo === "S" ? "Activo" : "Inactivo",
  }));

  // graphic patient statistic
  const patientStatusCount = patients.reduce<{ [key: string]: number }>(
    (data, patient) => {
      data[patient.activo] = (data[patient.activo] || 0) + 1;
      return data;
    },
    {}
  );
  const dataGraphic1 = Object.entries(patientStatusCount).map(
    ([name, value]) => ({ name: name === "S" ? "Activo" : "Inactivo", value })
  );

  // patient entry & exit by month
  const patientCountByMonth = patients.reduce<{
    [key: number]: { name: string; activo: number; inactivo: number };
  }>((data, patient) => {
    const patientEntryYear = new Date(patient.created_at).getFullYear();
    const patientExitYear = new Date(patient.fecha_retiro).getFullYear();
    if (patientEntryYear === new Date().getFullYear()) {
      const entryMonth = new Date(patient.created_at).getMonth();
      // Incrementa el contador para el mes de ingreso
      data[entryMonth] = data[entryMonth] || {
        name: "",
        activo: 0,
        inactivo: 0,
      };
      data[entryMonth].name = new Intl.DateTimeFormat("es-ES", {
        month: "long",
      }).format(new Date(new Date().getFullYear(), entryMonth));
      data[entryMonth].activo++;
    }
    if (patientExitYear === new Date().getFullYear()) {
      const exitMonth = new Date(patient.fecha_retiro).getMonth();
      // Incrementa el contador para el mes de salida
      data[exitMonth] = data[exitMonth] || { name: "", activo: 0, inactivo: 0 };
      data[exitMonth].name = new Intl.DateTimeFormat("es-ES", {
        month: "long",
      }).format(new Date(new Date().getFullYear(), exitMonth));
      data[exitMonth].inactivo++;
    }
    return data;
  }, {});
  const dataGraphic2 = Object.values(patientCountByMonth);

  return (
    <MainLayoutAdmin
      navigationItems={navigationItems}
      children={
        <>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <CardDashboard
              title="citas"
              date={new Date().toLocaleDateString("es-ES", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              quantity={String(reservations.length)}
              color="#2AA53D"
            />
            <CardDashboard
              title="doctores"
              date={new Date().toLocaleDateString("es-ES", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              quantity={String(doctors.length)}
              color="#FDA600"
            />
            <CardDashboard
              title="pacientes"
              date={new Date().toLocaleDateString("es-ES", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              quantity={String(patients.length)}
              color="#009EFB"
            />
            <CardTable
              title="pacientes activos"
              data={patient_information_data}
              columnNames={columnNamesPatient}
              tableStyle=""
            />
            <CardGraphic
              title="estadistica de pacientes"
              colSpan="1"
              childGraphic={<PieGraphic data={dataGraphic1} />}
            />
            <CardGraphic
              title="agregados & retirados"
              childGraphic={<BarGraphic data={dataGraphic2} />}
            />
            <CardTable
              title="doctores"
              colSpan="1"
              data={doctors_hability_data}
              columnNames={columnNamesDoctor}
              tableStyle="bg-[#2d3e50] text-white"
            />
          </div>
        </>
      }
    />
  );
};

export default AdminHome;
