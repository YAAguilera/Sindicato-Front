import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateDoctor from './Modals/DoctorModal';
import { getDoctors, deleteDoctors } from '../../Features/Services/doctors';
import { AppDispatch, RootState } from '../../Features/store/store';
import { TiDelete, TiPencil } from "react-icons/ti";
import EditDoctor from './Modals/EditDoctorModal';

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
  
  const dispatch = useDispatch<AppDispatch>();
  const doctors = useSelector((state:RootState) => state.doctor.doctors); 
   console.log("doctor table doctors",doctors)
  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  //delete
  const handleDelete = async (id: string) => {
    try {
     const response = await dispatch(deleteDoctors({id}));
     console.log(response);
    if(response.type === 'doctor/deleteDoctors/fulfilled'){
        await dispatch(getDoctors()) 
    }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };
  
  return (
    <main className="flex flex-col justify-center items-center align-middle gap-2 p-1 w-[25%]">
      {/* tabla */}
      <section className='w-[100%] h-[100%] rounded-xl bg-lightGray flex flex-col items-center'>
      <div className='w-[100%] h-[3em] rounded-t-xl bg-lightBlue flex justify-center items-center'>
        <h1 className="font-extrabold text-4xl font-serif text-darkBlue">Doctores</h1>
      </div>
      <div className='overflow-y-scroll w-full flex flex-col items-center gap-2 p-1'>
      {doctors && doctors.length>0 ?(
        doctors.map((doctor:any)=>{
          return(
            <article key={doctor.id} className='bg-darkGray rounded-xl w-[100%] gap-8 flex flex-row justify-center items-center '>
            <div className='flex flex-col justify-center items-center'>
            <h1 className='text-lg font-bold'>{doctor.name} {doctor.lastname}</h1>
            <h3 className='text-sm italic'>{doctor.speciality}</h3>
            </div>
            
            <div className='flex flex-row justify-end gap-2'>
              <button onClick={() => handleEdit(doctor)}>
                <TiPencil className='text-2xl text-black'/>
              </button>
              <button onClick={() => handleDelete(doctor.id)}>
                <TiDelete className='text-2xl text-red-800'/>
              </button>
            </div>
          </article>
          )
        })
      ) : (
        <h1>Debes crear doctores</h1>
      )}
      </div>
      
      </section>
     

      {/* boton */}
      <section className="flex flex-row gap-5 justify-center items-center align-middle">
        <button
          onClick={toggleModal}
          className="p-2 bg-darkBlue rounded-xl text-white font-serif font-semibold 
          transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue"
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
