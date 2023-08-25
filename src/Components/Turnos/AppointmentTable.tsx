import React, { useState, useEffect } from 'react';
import CreateAppointment from './Modals/CreateAppointment';
import CreatePatient from '../Patients/CreatePatientModal';
import AllPatientsComponent from '../Patients/GetPatientsModal';
import { TiPencil } from "react-icons/ti";
import { FcCheckmark } from "react-icons/fc";
import { getAppointments, deleteAppointments } from '../../Features/Services/appointment';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../Features/store/store';
import { useSelector } from 'react-redux';
import EditAppointment from './Modals/EditAppointment.Modal';
import AppointmentById from './Modals/DetailAppointmentModal';
import Swal from 'sweetalert2';


interface Doctor {
  id: string;
  name: string;
  lastname: string;
  speciality: string;
}

interface Patient {
  id: number;
  name: string;
  lastname: string;
  cel: string;
  insurance: string;
}

export interface Appointment {
  id: string,
  fecha: string,
  hora: string,
  pacienteId: number,
  doctorId:string,   
  Paciente: Patient,
  Doctor: Doctor
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based
  const year = date.getFullYear();

  return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
};


const AppointmentTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState<boolean>(false); // Agrega un estado para el modal de creación de pacientes
  const [isGetPatsModalOpen, setIsGetPatsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const togglePatientModal = () => {
    setIsPatientModalOpen(!isPatientModalOpen); // Cambia el estado del modal de creación de pacientes
  };
  const toggleGetPatsModal = () => {
    setIsGetPatsModalOpen(!isGetPatsModalOpen); // Cambia el estado del modal de creación de pacientes
  };

  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector((state: RootState) => state.appointment.appointments);
  

  useEffect(()=>{
    dispatch(getAppointments())
  }, [dispatch])


  const sortedAppointments = appointments
    ?.slice()
    .sort((a, b) => {
      const dateA = new Date(a?.fecha + ' ' + a?.hora);
      const dateB = new Date(b?.fecha + ' ' + b?.hora);
      return dateA.getTime() - dateB.getTime();
    })
    .map((appointment) => ({
      ...appointment,
      formattedFecha: formatDate(appointment.fecha), // Add the formatted date property
    }));
   

    console.log("este es sorted app",sortedAppointments);
    
  
  //delete
  const handleDelete = async (id: string) => {
    try {

      const result = await Swal.fire({
        title:
          "¿Estás seguro que quieres completar este turno? Al hacer esto se borrara y no se puede deshacer.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, completar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        const response = await dispatch(deleteAppointments({id}));
        console.log(response);
        if(response.type === 'Appointment/deleteAppointments/fulfilled'){
          await dispatch(getAppointments()) 
      }
    }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  //edit
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);


  const toggleModalEdit = () => {
    setIsModalOpenEdit(!isModalOpenEdit);
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    toggleModalEdit();
  };


  //detail
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  const handleClickArticle = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
  };


  return (
    <main className="flex flex-col h-full justify-center items-center align-middle
    xxl:w-[70%] 
    xl:w-[70%]
    lg:w-[70%]
    md:w-[70%]
    sm:w-full
    ">      <div className='flex flex-col  justify-center items-center bg-lightBlue w-full rounded-t-lg
    xxl:h-[5em]
    xl:h-[4em]
    lg:h-[3em]
    md:h-[3em]
    sm:h-[3em]
    '>
      <h1 className="font-extrabold font-serif text-darkBlue
       xxl:text-6xl
       xl:text-5xl
       lg:text-4xl
       md:text-3xl
       sm:text-3xl
      ">Turnos</h1>
    </div>
      <section className='bg-lightGray w-full h-[87%] overflow-y-scroll  rounded-b-xl'> 
        
        <section 
        
        className=' flex  flex-col p-2 gap-2 items-center align-middle'>
        {sortedAppointments.map(appointment => (
            <article
            key={appointment.id} className='w-full flex flex-row items-center align-middle h-[2em] bg-white rounded-xl p-7 text-center xxl:gap-20 xl:gap-16 lg:gap-10 md:gap-8'>
              <div onClick={() => handleClickArticle(appointment.id)} className='w-full flex flex-row justify-between items-center align-middle text-center'>
              <h1 className='font-bold'>{appointment.Paciente?.lastname} {appointment.Paciente?.name}</h1>
              <h1 className='font-semibold'>{appointment.Paciente?.insurance}</h1>
              <div className='flex flex-col'>
              <h1 className='font-bold'>{appointment?.formattedFecha}</h1>
              <h1 className='font-bold '>{appointment?.hora}</h1>
              </div>
              <h1 className='font-semibold'>{appointment?.Doctor?.name} {appointment.Doctor?.lastname}</h1>
              </div>
              <div className='flex flex-row gap-3'>
                    <button >
                      <TiPencil className=' text-black xxl:text-4xl
                xl:text-3xl
                lg:text-2xl
                md:text-xl
                sm:text-2xl'
                onClick={() => handleEdit(appointment)}/>
                    </button>
                    <button >
                      <FcCheckmark onClick={() => handleDelete(appointment.id)} className='xxl:text-4xl
                      xl:text-3xl
                      lg:text-2xl
                      md:text-xl
                      sm:text-2xl
                      transition-all duration-500 ease-in-out hover:transform hover:scale-125 
                      ' />
                    </button>
                  </div>
            </article>
          ))}        
        </section>
  </section>

      <section className="flex flex-row gap-5 mt-2 justify-center items-center align-middle">
      <button
          onClick={toggleGetPatsModal}
          className=" bg-darkBlue rounded-xl text-white font-serif font-semibold
            transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue
            xxl:p-2 xxl:text-2xl
            xl:p-2 xl:text-xl
            lg:p-2 lg:text-md
            md:p-2 md:text-xs
            sm:p-1 sm:text-xs
            "
        >
          Ver Pacientes
        </button>
        <button
          onClick={togglePatientModal} 
          className="bg-darkBlue rounded-xl text-white font-serif font-semibold
            transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue
            xxl:p-2 xxl:text-2xl
            xl:p-2 xl:text-xl
            lg:p-2 lg:text-md
            md:p-2 md:text-xs
            sm:p-1 sm:text-xs
            "
        >
          Crear paciente
        </button>

        <button
          onClick={toggleModal}
          className=" bg-darkBlue rounded-xl text-white font-serif font-semibold
            transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue
            xxl:p-2 xxl:text-2xl
            xl:p-2 xl:text-xl
            lg:p-2 lg:text-md
            md:p-2 md:text-xs
            sm:p-1 sm:text-xs
            "
        >
          Crear turno
        </button>
      </section>
      {isModalOpen && <CreateAppointment closeModal={toggleModal} />}
      {isPatientModalOpen && <CreatePatient closeModal={togglePatientModal} />} 
      {isGetPatsModalOpen && <AllPatientsComponent closeModal={toggleGetPatsModal}/>} 
      {isModalOpenEdit && selectedAppointment && (
        <EditAppointment closeModal={toggleModalEdit} selectedAppointment={selectedAppointment} />
      )}
      {selectedAppointmentId && (<AppointmentById closeModal={() => setSelectedAppointmentId(null)} appointmentId={selectedAppointmentId}
  />
)}
    </main>
  );
}

export default AppointmentTable;
