import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr'; 
import { AppDispatch, RootState } from '../../../Features/store/store';
import { getAppointmentById } from '../../../Features/Services/appointment';

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

interface AppointmentByIdProps {
    closeModal: () => void;
    appointmentId: string;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + "T00:00:00Z"); // Agregar hora y zona horaria UTC
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Meses son indexados en 0
    const year = date.getUTCFullYear();
  
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
};


  const AppointmentById: React.FC<AppointmentByIdProps> = ({ closeModal, appointmentId }) => {
    const dispatch=useDispatch<AppDispatch>()
    const selectedAppointment = useSelector((state: RootState) => state.appointment.appointments.find(app => app.id === appointmentId));

    useEffect(() => {
        if (selectedAppointment) {
          dispatch(getAppointmentById({id: appointmentId}));
        }
      }, [dispatch, selectedAppointment, appointmentId]);

      console.log("selected",selectedAppointment?.fecha);

      const filteredApp= formatDate(selectedAppointment!.fecha)
      
      
      
  return (
    <main className="fixed inset-0 flex flex-col justify-center items-center bg-lightGray bg-opacity-50">
        <section className="flex flex-col bg-lightBlue w-auto h-auto p-8 rounded-xl justify-center items-center gap-2">
        <div className="flex items-center justify-end w-full">
        <button className="" onClick={closeModal}>
        <GrClose/>
        </button> 
      </div>
      <h1 className="font-extrabold text-3xl font-serif text-white">Detalle del Turno</h1>
      {selectedAppointment && (
        <div className="flex flex-col justify-center items-center align-middle gap-5 text-white font-semibold text-xl">
          <h1>Paciente: {selectedAppointment.Paciente?.name} {selectedAppointment.Paciente?.lastname}</h1>
          <h1>DNI: {selectedAppointment.Paciente?.id}</h1>
          <h1>Mutual: {selectedAppointment.Paciente?.insurance}</h1>
          <h1>Teléfono: {selectedAppointment.Paciente?.cel}</h1>
          <h1>Doctor: {selectedAppointment.Doctor?.name}{selectedAppointment.Doctor?.lastname}</h1>
          <h1>Especialidad: {selectedAppointment.Doctor?.speciality}</h1>
          <h1>Fecha y horario: {filteredApp} {selectedAppointment.hora}</h1>
        </div>
      )}
      </section>
  </main>
  )
}

export default AppointmentById