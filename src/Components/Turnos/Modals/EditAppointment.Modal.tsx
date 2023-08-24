import React from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr'; 
import { AppDispatch, RootState } from '../../../Features/store/store';
import { Appointment } from '../AppointmentTable';
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
  
  interface AppointmentFormData {
    id: string,
    fecha: string,
    hora: string,
    pacienteId: number,
    doctorId:string,   
    Paciente: Patient,
    Doctor: Doctor
  }
interface editAppointmentProps {
    closeModal: () => void;
    selectedAppointment: Appointment | null; // Agrega el prop aquí
  }
  

  const EditAppointment: React.FC<editAppointmentProps> = ({ closeModal, selectedAppointment  }) => {
    const { register, handleSubmit, trigger } = useForm<AppointmentFormData>();

    const handleBlur = (fieldName: any) => {
      trigger(fieldName);
    };

    const doctors = useSelector((state: RootState)=> state.doctor.doctors)
  

    const dispatch=useDispatch<AppDispatch>()

    const initialValues: AppointmentFormData = {
        id: selectedAppointment?.id || "", 
        fecha: selectedAppointment?.fecha || "",
        hora: selectedAppointment?.hora || "",
        pacienteId: selectedAppointment?.Paciente.id || 0, 
        doctorId: selectedAppointment?.Doctor.id || "",
        Paciente: {
          id: selectedAppointment?.Paciente.id || 0, 
          name: selectedAppointment?.Paciente.name || "",
          lastname: selectedAppointment?.Paciente.lastname || "",
          cel: selectedAppointment?.Paciente.cel || "",
          insurance: selectedAppointment?.Paciente.insurance || "",
        },
        Doctor: {
          id: selectedAppointment?.Doctor.id || "",
          name: selectedAppointment?.Doctor.name || "",
          lastname: selectedAppointment?.Doctor.lastname || "",
          speciality: selectedAppointment?.Doctor.speciality || "",
        },
      };
   
      
      const onSubmit = async (data: AppointmentFormData) => {
        try {
            console.log('esto es data',data);
            const {  doctorId, hora, fecha  } = data;
          const response = await dispatch(
            putAppointment({
                id:initialValues.id,
                doctorId,
                hora,
                fecha, 
            })
           );

        
             if(response.type==='Appointment/putAppointment/fulfilled'){
                console.log(response)
               await dispatch(getAppointments())
               closeModal()
             }
             
        } catch (error) {
          // Manejar errores de la llamada
          console.error('Error al editar el paciente:', error);
        }
      };
    
  return (
    <main className="fixed inset-0 flex flex-col justify-center items-center bg-lightGray bg-opacity-50">
    <section className="flex flex-col bg-lightBlue w-auto h-auto p-5 rounded-xl justify-center items-center gap-4">
      <div className="flex items-center justify-end w-full">
        <button className="" onClick={closeModal}>
        <GrClose/>
        </button>
      </div>
      <h1 className="font-extrabold text-2xl font-serif text-white">Editar Turno</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      <input type="number"  defaultValue={initialValues.pacienteId} className="p-1 rounded-lg bg-lightGray placeholder-black"
    disabled
    />

<select id="" {...register('doctorId')} value={initialValues.doctorId}>
  <option value="" disabled={true}>Seleccione un doctor</option>
  {doctors.map((doctor: any) => (
    <option key={doctor.id} value={doctor.id}>
      {doctor.name} {doctor.lastname}
    </option>
  ))}
</select>

        <input type="date"  defaultValue={initialValues.fecha} className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('fecha', {
           required: 'Este campo es obligatorio'
          }) 
        }
        onBlur={() => handleBlur('fecha')}
        />
        
        <input type="text"  defaultValue={initialValues.hora} className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('hora') 
        }
        onBlur={() => handleBlur('hora')}
        />

        <button
           type="submit"
          className="p-2 bg-darkBlue rounded-xl text-white font-serif font-semibold transition-all duration-500 ease-in-out hover:transform hover:scale-110"
        >
          Editar
        </button>
      </form>
    </section>
  </main>
  )
}

export default EditAppointment