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
  console.log("", appointments);

  useEffect(()=>{
    dispatch(getAppointments())
  }, [dispatch])

  const sortedAppointments = appointments?.slice().sort((a, b) => {
    const dateA = new Date(a?.fecha + ' ' + a?.hora);
    const dateB = new Date(b?.fecha + ' ' + b?.hora);
    return dateA.getTime() - dateB.getTime();
  });
  
  //delete
  const handleDelete = async (id: string) => {
    try {

      const result = await Swal.fire({
        title:
          "¿Estás seguro que quieres eliminar este turno? Esta acción no se puede deshacer.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
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
        
        <section className=' flex  flex-col p-2 gap-2 items-center align-middle'>
        {sortedAppointments.map(appointment => (
            <article key={appointment.id} className='w-full flex flex-row justify-between items-center align-middle h-[2em] bg-white rounded-xl p-7 text-center '>
              <h1>{appointment.Paciente?.lastname} {appointment.Paciente?.name}</h1>
              <h1>{appointment.Paciente?.insurance}</h1>
              <div className='flex flex-col'>
              <h1>{appointment?.fecha}</h1>
              <h1>{appointment?.hora}</h1>
              </div>
              <h1>{appointment?.Doctor?.name} {appointment.Doctor?.lastname}</h1>
              <div className='flex flex-row gap-3'>
                    <button >
                      <TiPencil className=' text-black xxl:text-4xl
                xl:text-3xl
                lg:text-2xl
                md:text-xl
                sm:text-2xl'/>
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

    </main>
  );
}

export default AppointmentTable;
