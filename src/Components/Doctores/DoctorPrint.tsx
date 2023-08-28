import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAppointments } from '../../Features/Services/appointment';
import { AppDispatch, RootState } from '../../Features/store/store';
import DoctorAppointmentsTable from './DoctorPrintTable'
import {BiSpreadsheet, BiExit} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { getDoctorsById } from '../../Features/Services/doctors';
import { useDispatch } from 'react-redux';
import { resetDoctorId } from '../../Features/Slices/doctorSlice';
import ReactToPrint from 'react-to-print';

const formatDate = (dateString: string): string => {
    const date = new Date(dateString + "T00:00:00Z"); // Agregar hora y zona horaria UTC
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Meses son indexados en 0
    const year = date.getUTCFullYear();
  
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
};


const DoctorPrint = () => {
  const componentRef = useRef<HTMLDivElement>(null)

    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(getAppointments())
        if (id) {
          dispatch(getDoctorsById(id));
        }
      }, [id]);
  const nav= useNavigate()
  // Filtrar el array de objetos por el doctorId
  const appointments = useSelector((state: RootState) => state.appointment.appointments);
  console.log("",appointments);
  
  const doctor = useSelector((state:RootState)=> state.doctor.doctorId)

  const filteredApp= appointments.filter((app) => app.doctorId === id )
 

  const formattedAppointments = filteredApp.map(appointment => {
    return {
      ...appointment, // Mantener las otras propiedades intactas
      fecha: formatDate(appointment.fecha) // Formatear la propiedad "fecha"
    };
  });

  const currentDate = formatDate(new Date().toISOString().split('T')[0]); // Usamos formatDate para tener el mismo formato

  
  const formattedAppointmentsToday = formattedAppointments.filter(appointment => {
    return appointment.fecha === currentDate;
  });
  formattedAppointmentsToday.sort((a, b) => {
    const horaA = a.hora;
    const horaB = b.hora;
    
    // Aquí estamos comparando las horas en formato HH:MM:SS.
    // Si las horas son iguales, se comparan los minutos.
    // Si los minutos son iguales, se comparan los segundos.
    if (horaA < horaB) {
        return -1;
    }
    if (horaA > horaB) {
        return 1;
    }
    return 0;
});


  console.log("format",formattedAppointmentsToday);
//@ts-ignore
  const doctorName = doctor?.name; //@ts-ignore
  const doctorLastName = doctor?.lastname; 



  const onExit = (()=>{
    dispatch(resetDoctorId())
    nav('/')
  })
  
  return (
    <main className='flex overflow-hidden flex-col justify-center items-center bg-gradient-to-t from-lightBlue to-darkBlue w-screen xxl:h-full xl:h-full lg:h-full md:h-full sm:h-full '>
        
        <section className='flex flex-col justify-center gap-9 items-center'>
        {doctorName ?(<h1 className='xxl:text-4xl
                xl:text-3xl
                lg:text-2xl
                md:text-xl
                sm:text-2xl text-white '>Doctor: <span className='text-white font-bold underline'>{doctorName + " "+ doctorLastName}</span></h1>):(
                  <h1 className='xxl:text-4xl
                xl:text-3xl
                lg:text-2xl
                md:text-xl
                sm:text-2xl text-white '>Doctor: <span className='text-white font-bold underline'>Cargando... </span></h1>
                )}
<div ref={componentRef}><DoctorAppointmentsTable appointments={formattedAppointmentsToday}/></div>
        
        {/*@ts-ignore*/}
        <ReactToPrint
        trigger={()=> <button className='flex flex-row p-2 text-center justify-center items-center bg-blue-900 rounded-lg'>
        <BiSpreadsheet className='text-white
        xxl:text-4xl
        xl:text-3xl
        lg:text-2xl
        md:text-xl
        sm:text-2xl
        '/>
       <span className='text-white font-bold'>Imprimir</span> 
</button>
}
content={() => componentRef.current}

documentTitle="Doctor"
        />
       
        <button onClick={onExit} className='flex flex-row p-2 text-center justify-center items-center bg-red-900 rounded-lg'>
                <BiExit className='text-white
                xxl:text-4xl
                xl:text-3xl
                lg:text-2xl
                md:text-xl
                sm:text-2xl
                '/>
               <span className='text-white font-bold'>Volver</span> 

        </button>
        </section>
    </main>
  );
};

export default DoctorPrint;
