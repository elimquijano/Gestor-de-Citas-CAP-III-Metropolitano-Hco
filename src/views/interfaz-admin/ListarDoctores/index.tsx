import { useState ,useEffect} from "react";
import { AiFillAppstore } from "react-icons/ai";
import MainLayoutAdmin from "../../../components/MainLoyout/MainLayoutAdmin";
import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import ItemsPerPageSelector from "../../../components/Tablas/components/ItemsPerPageSelector";
import {
  deleteDoctor,
  updateDoctor,
  setCurrentPage,
  setItemsPerPage,
  fetchDoctors,
  // updateDoctorSuccess,
  // resetUpdateSuccess,
  // updateDoctorFailure,

} from "../../../store/slices/doctorSlice";
import SearchInput from "../../../components/Tablas/components/SearchInput";
import Table from "../../../components/Tablas/Table";
import Pagination from "../../../components/Tablas/components/Pagination";
import ModalCenter from "../../../components/Modal/ModalCenter";
import InputsFormDoctor from "../../../components/Formularios/Doctor/InputsFormDoctor";
import ButtonForm from "../../../components/Botones/ButtonForm";
import { toggleModal } from "../../../store/slices/mainLayoutSlice";
import { fetchHorarios } from "../../../store/slices/horarioSlice";
import { RootState } from "../../../store";
import ModalSucces from "../../../components/Modal/ModalSuccess";
import ModalError from "../../../components/Modal/ModalError";
import ModalConfirm from "../../../components/Modal/ModalConfirm";

import { useAppDispatch, useAppSelector } from "../../../shared/hooks";

const ListarDoctores = () => {

  // main layout
  const navigationItems = [
    { to: "/", text: "Home", icon: <AiFillAppstore /> },
    { to: "/admin/doctores/listar", text: "Doctores" },
  ];

  const dispatch = useAppDispatch();


  const itemsPerPageRedux = useAppSelector(
    (state: RootState) => state.doctorSlice.itemsPerPage
  );
  const currentPage = useAppSelector(
    (state: RootState) => state.doctorSlice.currentPage
  );
  const horarios = useAppSelector(
    (state: RootState) => state.horarioSlice.horarios
  );
 
  // const updateSuccess = useAppSelector((state: RootState) => state.doctorSlice.updateSuccess);
  
  const doctors = useAppSelector(state => state.doctorSlice.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchHorarios());
  }, [dispatch]);


  const [searchTerm, setSearchTerm] = useState<string>("");
  const startIndex = (currentPage - 1) * itemsPerPageRedux;
  const endIndex = startIndex + itemsPerPageRedux;
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.nombres.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
  

  const columns = [
    { property: "dni", label: "DNI" },
    { property: "nombres", label: "Nombre" },
    { property: "apellidos", label: "Apellido" },
    { property: "cod_especialidad", label: "Especialidad" , transform: (value: any) => {
      switch (value) {
        case 1:
          return "Cardiología";
        case 2:
          return "Radiología";
        case 3:
          return "Ginecología";
        case 4:
          return "Pediatría";
      }
    } },

    { property: "sexo", label: "Sexo" },
    { property: "telefono", label: "Teléfono" },
    { property: "correo", label: "Email" },
    { property: "created_at", label: "Fecha de Ingreso" },
    { property: "activo", label: "Estado", transform: (value: any) => {
      switch (value) {
        case "S":
          return "Activo";
        case "N":
          return "No Activo";

      }
    } },
  ];

 

  const deleteItem =   async () => {
    setIsShowModalConfirm(false);
    try {
      const searchDoctor = doctors.find((doctor) => doctor.id === idDoctor);
      let dniDoctor: string | null = searchDoctor !== undefined ? searchDoctor["id"] : null;

      if (dniDoctor !== null) {
        dispatch(deleteDoctor(dniDoctor));
        setModalMessage("¡Se eliminó los datos correctamente!");
        setIsShowModalSuccess(true);
      } else {
        // Maneja el caso en que dniDoctor es null
        // Por ejemplo, puedes mostrar un mensaje de error
        setModalMessage("¡ocurrio un error!, inténtalo más tarde");
        setIsShowModalError(true);
      }
    } catch (error) {
      setModalMessage("¡ocurrio un error!, inténtalo más tarde");
      setIsShowModalError(true);
    }
  };


  // modal
  const [idDoctor, setIdDoctor] = useState(null);
  const [formData, setFormData] = useState({
    dni: "",
    name: "",
    lastname: "",
    specialty: { id: "", nombre: "" },
    department: { id: "", nombre: "" },
    sex: "",
    phone: "",
    email: "",
    status: "Activo",
    horario: [] as { dias_semana: string; entrada: string; salida: string }[],
    
  });


  interface Doctor {
    id: string, 
    dni: string;
    nombres: string;
    apellidos: string;
    cod_especialidad:string;
    cod_departamento:string;
    sexo: string;
    telefono: string;
    correo: string;
    activo: string;
    horarios: {
        dias_semana: string;
        entrada: string;
        salida: string;
        }[];
    horarioanterior: {
      dias_semana: string;
      entrada: string;
      salida: string;
      }[];
  }

    const horariosSeparados = formData.horario.map(({ dias_semana, entrada, salida }) => ({
      dias_semana: dias_semana,
      entrada: entrada,
      salida: salida,
    }));

    const handleSubmit = async () => {

      const horariosNuevos = formData.horario;

      const horariosDelDoctor = horarios
        .filter((horario) => horario.cod_doctor === idDoctor)
        .map((horario) => {
          const registrado = horariosNuevos.some((nuevoHorario) => {
            return (
              nuevoHorario.dias_semana === horario.dias_semana &&
              nuevoHorario.entrada === horario.entrada &&
              nuevoHorario.salida === horario.salida
            );
          });
      
          return {
            ...horario,
            registrado: registrado,
          };
        });

      const newDoctor:Doctor = {
        id: String(idDoctor), 
        dni: formData.dni,
        nombres: formData.name,
        apellidos: formData.lastname,
        cod_especialidad: String(formData.specialty.id),
        cod_departamento: String(formData.department.id),
        sexo: formData.sex,
        telefono: formData.phone,
        correo: formData.email,
        activo: formData.status,
        horarios: horariosSeparados,
        horarioanterior:horariosDelDoctor, // Asegúrate de que formData.horario es del tipo correcto
      };
      console.log(newDoctor);
      //const newHorario = formData.horario.map(())
      try {
        dispatch(updateDoctor(newDoctor));
        toggleVisibility();   
        setModalMessage("¡Se actualizaron los datos correctamente!");
        setIsShowModalSuccess(true);
      } catch (error) {
        toggleVisibility();
        setModalMessage("¡ocurrio un error!, inténtalo más tarde");
        setIsShowModalError(true);
      }

  
    };

  
  const toggleVisibility = () => {
    dispatch(toggleModal());
  };

  
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  return (
    <MainLayoutAdmin
      navigationItems={navigationItems}
      children={
        <>
          <SubHeaderConEnlaces
            title="LISTA DE DOCTORES"
            linkTo="/admin/doctores/agregar"
            linkText="Agregar Doctor"
          />
          {/* tabla */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <ItemsPerPageSelector
                itemsPerPageRedux={itemsPerPageRedux}
                onChange={(newValue) => dispatch(setItemsPerPage(newValue))}
              />
              <SearchInput
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
              />
            </div>
            <Table
              columns={columns}
              data={paginatedDoctors}
              onEditClick={(item) => {
                setIdDoctor(item.id);
              
                const horario = horarios.filter((horario) => horario.cod_doctor === item["id"])        
                  .map((horario) => {

                    return {
                      dias_semana: horario.dias_semana,
                      entrada: horario.entrada,
                      salida: horario.salida,
                    };
                  });
 
                setFormData({
                  dni:  item["dni"],
                  name: item["nombres"],
                  lastname: item["apellidos"],
                  specialty:{ id: item["cod_especialidad"], nombre: "" },
                  department:{ id: item["cod_departamento"], nombre: "" },
                  sex: item["sexo"],
                  phone: item["telefono"],
                  email: item["correo"],
                  status:  item["activo"] === 'S' ? 'Activo' : 'NoActivo',
                  horario: horario,
                });

                toggleVisibility();
              }}
              onDeleteClick={(item) => {
                setIdDoctor(item["id"]);
                setIsShowModalConfirm(true);
              }}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPageRedux}
              totalItems={filteredDoctors.length}
              onPageChange={(newPage) => dispatch(setCurrentPage(newPage))}
            />
          </div>
          <ModalCenter
            modalChildren={
              <>
                <form className="p-4 grid grid-cols-2 gap-8">
              <InputsFormDoctor
                      formData={formData}
                      setFormData={setFormData}
                    />



                  <div className="flex gap-2 col-span-2 justify-end">
                    <ButtonForm
                      label="Cancelar"
                      onClick={toggleVisibility}
                      classColor="bg-secondary"
                    />
                    <ButtonForm
                      label="Actualizar"
                      onClick={handleSubmit}
                      classColor="bg-warning"
                    />
                  </div>
                </form>
              </>
            }
          />
          {/* alertas */}
          <ModalSucces
            isShowModalSuccess={isShowModalSuccess}
            setIsShowModalSuccess={setIsShowModalSuccess}
            message={modalMessage}
          />
          <ModalError
            isShowModalError={isShowModalError}
            setIsShowModalError={setIsShowModalError}
            message={modalMessage}
          />
          <ModalConfirm
            isShowModalConfirm={isShowModalConfirm}
            setIsShowModalConfirm={setIsShowModalConfirm}
            onClick={deleteItem}
            message="¿Estás seguro de eliminar permanentemente?"
          />
        </>
      }
    />
  );
};

export default ListarDoctores;
