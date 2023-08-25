import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../Features/store/store';
import { getAppointments, postAppointment } from '../../../Features/Services/appointment';
import { useSelector } from 'react-redux';

interface CreateAppointmentProps {
  closeModal: () => void;
}

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

const CreateAppointment: React.FC<CreateAppointmentProps> = ({ closeModal }) => {
  const { register, handleSubmit, formState } = useForm<AppointmentFormData>();
  const [Color, setColor] = useState("")
  const [error,setError] = useState(false)
 
  const doctors = useSelector((state: RootState)=> state.doctor.doctors)
  const loading = useSelector((state:RootState)=>state.appointment.status)
  const patients = useSelector((state:RootState)=> state.patient.patients)
  const dispatch=useDispatch<AppDispatch>()

  console.log(doctors)

  //Post
  const onSubmit: SubmitHandler<AppointmentFormData> = async (formData: AppointmentFormData) => {
    try {
      console.log("form data post",formData);
       // Llama a la acción postPatient a través de Redux Toolkit
     const response =  await dispatch(postAppointment(formData));
     console.log(response);
     
     if(response.type === "Appointments/postAppointment/fulfilled"){
      dispatch(getAppointments())
      closeModal();
     }
     } catch (error) {
       console.error('Error al crear paciente:', error);
     }
  };

  const onSearchPatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    // Convertir el valor ingresado a número
    const inputValueAsNumber = parseInt(value, 10);
  
    // Verificar si el valor ingresado coincide con algún ID de paciente
    const patientFound = patients.find(patient => patient.id === inputValueAsNumber);
  
    if (patientFound) {
      console.log('Paciente encontrado:', patientFound);
      setColor('green')
      setError(false)
    } else {
      console.log('Paciente no encontrado');
      setColor('red')
      setError(true)
    }
  }



  return (
    <main className="fixed inset-0 flex flex-col justify-center items-center bg-lightGray bg-opacity-50">
      <section className="flex flex-col bg-lightBlue w-auto h-auto p-5 rounded-xl justify-center items-center gap-4">
        <div className="flex items-center justify-end w-full">
          <button className="" onClick={closeModal}>
          <GrClose/>
          </button>
        </div>
        <h1 className="font-extrabold text-2xl font-serif text-white">Crear Turno</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <input
  type="text"
  {...register('pacienteId')}
  onChange={onSearchPatient}
  placeholder="DNI"
  className={`bg-lightGray rounded-lg p-1 transition-all duration-300 ease-in-out border-2 ${
    error ? 'border-red-500' : `border-${Color}-500`
  } focus:outline-none focus:ring-0`}
/>
{error && (
  <div className="text-red-500">No se encuentra al paciente</div>
)}
          <select id="" {...register('doctorId',{
           required: 'Este campo es obligatorio'
            })}>
            <option value="" disabled={true} selected>Seleccione un doctor</option>
            {doctors.map((doctor: any)=>{
              return(
               <option key={doctor.id} value={doctor.id}>{doctor.name+" "+doctor.lastname}</option>
              )
            })}
          </select>
          
          <input type="date" {...register('fecha',{
             required: 'Este campo es obligatorio'}
          )} placeholder=" Fecha" className="p-1 rounded-lg bg-lightGray placeholder-black" />

          <input type="text" {...register('hora', 
          {required: 'Este campo es obligatorio'}
          )} placeholder=" Hora" className="p-1 rounded-lg bg-lightGray placeholder-black" />

          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="p-2 bg-darkBlue rounded-xl text-white font-serif font-semibold transition-all duration-500 ease-in-out hover:transform hover:scale-110"
          >
            {loading==='loading'  ? "Creando...": "Crear" }
          </button>
        </form>
      </section>
    </main>
  );
}

export default CreateAppointment;
