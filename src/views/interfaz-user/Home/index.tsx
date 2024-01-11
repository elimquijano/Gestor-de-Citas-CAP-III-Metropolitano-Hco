import { AiFillAppstore } from "react-icons/ai"
import AreaBar from "../../../components/Graficos/Charts/AreaBar"
import CardDashboard from "../../../components/Cards/CardDashboard"
import MainLayoutPatient from "../../../components/MainLoyout/MainLayoutPatient"
import PieChart from "../../../components/Graficos/Charts/PieChart"
import VerticalBar from "../../../components/Graficos/Charts/VerticalBar"

const UserHome = () => {
  // main layout
  const navigationItems = [
    { to: "/dashboard/user", text: "Home", icon: <AiFillAppstore /> },
  ]
  const fecha = new Date().toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  return (
    <MainLayoutPatient
      navigationItems={navigationItems}
      children={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center">
            <div className="w-full flex justify-center">
              <VerticalBar w={500} />
            </div>
            <div className="w-full flex justify-center">
              <AreaBar w={500} />
            </div>
            <div className="w-full flex justify-center">
              <PieChart w={400} />
            </div>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <CardDashboard
              title="citas pendientes"
              date={fecha}
              color="#FDA600"
              quantity="1"
            />
            <CardDashboard
              title="citas aceptadas"
              date={fecha}
              color="#2AA53D"
              quantity="1"
            />
            <CardDashboard
              title="citas rechazadas"
              date={fecha}
              color="#DD3242"
              quantity="1"
            />
          </div>
        </>
      }
    />
  )
}

export default UserHome
