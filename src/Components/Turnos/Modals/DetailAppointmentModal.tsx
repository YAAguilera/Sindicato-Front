import React from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr'; 
import { AppDispatch, RootState } from '../../../Features/store/store';
import { getAppointments, putAppointment } from '../../../Features/Services/appointment';

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
  
  interface Appointment {
    id: string,
    fecha: string,
    hora: string,
    pacienteId: number,
    doctorId:string,   
    Paciente: Patient,
    Doctor: Doctor
  }
interface AppointmentByIdProps {
    closeModal: () => void;

  }
  

  const AppointmentById: React.FC<AppointmentByIdProps> = ({ closeModal }) => {
   
      
  return (
    <main className="fixed inset-0 flex flex-col justify-center items-center bg-lightGray bg-opacity-50">
      <div className="flex items-center justify-end w-full">
        <button className="" onClick={closeModal}>
        <GrClose/>
        </button>
      </div>
     
  </main>
  )
}

export default AppointmentById