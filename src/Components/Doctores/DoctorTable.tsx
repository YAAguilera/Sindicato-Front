import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateDoctor from './Modals/DoctorModal';
import { getDoctors, deleteDoctors } from '../../Features/Services/doctors';
import { AppDispatch, RootState } from '../../Features/store/store';
import { TiDelete, TiPencil, TiArrowForward } from "react-icons/ti";
import EditDoctor from './Modals/EditDoctorModal';
import Swal from 'sweetalert2';
import { getPatients } from '../../Features/Services/patients';
import { useNavigate } from 'react-router-dom';
import { getAppointments } from '../../Features/Services/appointment';

export interface Doctor {
  id: string;
  name: string;
  lastname: string;
  speciality: string;
}

const DoctorTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const navigate = useNavigate()


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalEdit = () => {
    setIsModalOpenEdit(!isModalOpenEdit);
  };

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    toggleModalEdit();
  };
  useEffect (()=>{
    getAppointments()
  })
  const dispatch = useDispatch<AppDispatch>();
  const doctors = useSelector((state:RootState) => state.doctor.doctors); 
   console.log("doctor table doctors",doctors)
  useEffect(() => {
    dispatch(getDoctors());
    dispatch(getPatients())
  }, [dispatch]);


  const alphabeticalDoctors = doctors.slice().sort((a, b) => {
    const lastNameComparison = a.name.localeCompare(b.name);
    if (lastNameComparison === 0) {
      return a.lastname.localeCompare(b.lastname);
    }
    return lastNameComparison;
  });
  console.log("ordenados",alphabeticalDoctors);
  
  //delete
  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title:
          "¿Estás seguro que quieres eliminar este doctor? Esta acción no se puede deshacer.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        const response = await dispatch(deleteDoctors({id}));
        console.log(response);
       if(response.type === 'doctor/deleteDoctors/fulfilled'){
           await dispatch(getDoctors()) 
      } 
    }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handlePrint = async(id:string) =>{
      try {

        if(id){
          navigate(`/doctor/${id}`)
        }
        
      } catch (error) {
        
      }
  }
  
  return (
    <main className="flex flex-col justify-center h-full  items-center align-middle gap-2 p-1 
    xxl:w-[30%]
    xl:w-[30%]
    lg:w-[30%]
    md:w-[30%]
    sm:w-full
    ">
      {/* tabla */}
      <section className='w-[100%] h-[90%] rounded-xl bg-lightGray flex flex-col items-center'>
      <div className='w-[100%] rounded-t-xl bg-lightBlue flex justify-center items-center
      xxl:h-[5em]
      xl:h-[4em]
      lg:h-[3em]
      md:h-[3em]
      sm:h-[3em]
      '>
        <h1 className="font-extrabold py-1 font-serif text-darkBlue
         xxl:text-6xl
         xl:text-5xl
         lg:text-4xl
         md:text-3xl
         sm:text-3xl
        ">Doctores</h1>
      </div>
      <div className='overflow-y-scroll   w-full flex flex-col items-center gap-2 p-1'>
      {alphabeticalDoctors && alphabeticalDoctors.length>0 ?(
        alphabeticalDoctors.map((doctor:any)=>{
          return(
            <article key={doctor.id} className='bg-white rounded-xl w-[100%] flex flex-row justify-center items-center 
            xxl:gap-8
            xl:gap-8
            lg:gap-8
            md:gap-2
            sm:gap-2
            '>
            <div className='flex flex-col justify-center items-center'>
            <h1 className='font-semibold text-center
            xxl:text-xl
            xl:text-xl
            lg:text-lg
            md:text-sm
            sm:text-md
            '>{doctor.name} {doctor.lastname}</h1>
            <h3 className='italic
             xxl:text-lg
             xl:text-lg
             lg:text-md
             md:text-sm
             sm:text-sm
            '>{doctor.speciality}</h3>
            </div>
            
            <div className='flex flex-row justify-end gap-2'>
              <button onClick={() => handleEdit(doctor)}>
                <TiPencil className='text-black
                xxl:text-4xl
                xl:text-3xl
                lg:text-2xl
                md:text-xl
                sm:text-2xl
                '/>
              </button>
              <button onClick={() => handleDelete(doctor.id)}>
                <TiDelete className='text-red-800
                xxl:text-4xl
                xl:text-3xl
                lg:text-2xl
                md:text-xl
                sm:text-2xl
                '/>
              </button>
              <button onClick={() => handlePrint(doctor.id)}>
                <TiArrowForward className='text-blue-800
                xxl:text-4xl
                xl:text-3xl
                lg:text-2xl
                md:text-xl
                sm:text-2xl
                '/>
              </button>
            </div>
          </article>
          )
        })
      ) : (
        <h1 className='font-bold font-serif p-2 text-md text-center'>Debes crear doctores</h1>
      )}
      </div>
      
      </section>
     

      {/* boton */}
      <section className="flex flex-row gap-5 justify-center items-center align-middle">
        <button
          onClick={toggleModal}
          className="bg-darkBlue rounded-xl text-white font-serif font-semibold 
          transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue
          xxl:p-2 xxl:text-2xl
            xl:p-2 xl:text-xl
            lg:p-2 lg:text-md
            md:p-2 md:text-xs
            sm:p-1 sm:text-xs
          "
        >
          Añadir Doctores
        </button>
      </section>
      {isModalOpenEdit && <EditDoctor closeModal={toggleModalEdit} selectedDoctor={selectedDoctor} />}
      {isModalOpen && <CreateDoctor closeModal={toggleModal} />}
    </main>
  );
}

export default DoctorTable;
