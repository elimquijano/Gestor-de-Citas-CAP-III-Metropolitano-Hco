import { useState, useEffect } from "react";
import { AiFillAppstore } from "react-icons/ai";

import SubHeaderConEnlaces from "../../../components/Navegacion/SubHeaderConEnlaces";
import ItemsPerPageSelector from "../../../components/Tablas/components/ItemsPerPageSelector";
import {
    deleteReservation,
    fetchReservations,

} from "../../../store/slices/citasSlice";
import SearchInput from "../../../components/Tablas/components/SearchInput";
import Table from "../../../components/Tablas/Table";
import Pagination from "../../../components/Tablas/components/Pagination";


import ModalSucces from "../../../components/Modal/ModalSuccess";
import ModalError from "../../../components/Modal/ModalError";
import ModalConfirm from "../../../components/Modal/ModalConfirm";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { RootState } from "../../../store";
import { setCurrentPage, setItemsPerPage } from "../../../store/slices/horarioSlice";
import { fetchDepartamentos } from "../../../store/slices/departamentoSlice";
import { fetchPatients } from "../../../store/slices/pacienteSlice";
import { fetchDoctors } from "../../../store/slices/doctorSlice";
import MainLayoutPatient from "../../../components/MainLoyout/MainLayoutPatient";

const VerCitas = () => {
    const navigationItems = [
        { to: "/", text: "Home", icon: <AiFillAppstore /> },
        { to: "/admin/citas/listar", text: "Citas" },
    ];



    const dispatch = useAppDispatch();

    const itemsPerPageRedux = useAppSelector(
        (state: RootState) => state.citasSlice.itemsPerPage
    );
    const currentPage = useAppSelector(
        (state: RootState) => state.citasSlice.currentPage
    );
    const reservations = useAppSelector(
        (state: RootState) => state.citasSlice.reservations
    );

    useEffect(() => {
        dispatch(fetchReservations());
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const startIndex = (currentPage - 1) * itemsPerPageRedux;
    const endIndex = startIndex + itemsPerPageRedux;


    const departamentos = useAppSelector(state => state.departamentoSlice.departamentos);
    const pacientes = useAppSelector(state => state.pacienteSlice.patients);
    const doctores = useAppSelector(state => state.doctorSlice.doctors);


    useEffect(() => {
        dispatch(fetchDepartamentos());
        dispatch(fetchPatients());
        dispatch(fetchDoctors());
      }, [dispatch]);

    const mapReservations = (reservations: any[]) => {
        return reservations.map(reservation => {
            const paciente = pacientes.find(p => p.id === reservation.cod_paciente);
            const doctor = doctores.find(d => d.id === reservation.cod_doctor);
            const departamento = departamentos.find(d => d.id === reservation.cod_departamento);

            return {
                ...reservation,
                paciente: paciente ? `${paciente.nombres} ${paciente.apellido_paterno}` : '',
                doctor: doctor ? `${doctor.nombres} ${doctor.apellidos}` : '',
                departamento: departamento ? departamento.nombre : '',
            };
        });
    };

    const filteredReservations = mapReservations(reservations).filter((reservation) =>
        reservation.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.departamento.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedReservations = mapReservations(filteredReservations.slice(startIndex, endIndex));



    const columns = [
        { property: "paciente", label: "Paciente" },
        { property: "doctor", label: "Doctor" },
        { property: "departamento", label: "Departamento" },
        { property: "fecha", label: "Fecha" },
        { property: "hora_inicio", label: "Hora de Inicio" },
        { property: "hora_fin", label: "Hora de Fin" },
        { property: "activo", label: "Estado" },
    ];
    const deleteItem = async (id: number) => {
        try {
            await dispatch(deleteReservation(id));
        } catch (error) {
            console.log(error);
        }
    };



    const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
    const [isShowModalError, setIsShowModalError] = useState(false);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [modalMessage] = useState("");

    return (
        <MainLayoutPatient
            navigationItems={navigationItems}
            children={
                <>
                    <SubHeaderConEnlaces
                        title="LISTA DE CITAS"
                        linkTo="/admin/citas/agregar"
                        linkText="Agregar Cita"
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
                            data={paginatedReservations}
                            onDeleteClick={(item) => {
                                console.log(item);

                            }}
                            onEditClick={(item) => {
                                console.log(item);
                            }}
                        />
                        <Pagination
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPageRedux}
                            totalItems={filteredReservations.length}
                            onPageChange={(newPage) => dispatch(setCurrentPage(newPage))}
                        />
                    </div>
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
                        onClick={() => deleteItem(1)}
                        message={modalMessage}
                    />
                </>
            }
        />
    );
};

export default VerCitas;
