import React from 'react';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../Features/store/store';
import { getPatients, deletePatient } from '../../Features/Services/patients';
import { TiDelete, TiPencil } from "react-icons/ti";
import EditPatient from './EditPatientModal';

interface CreatePatientProps {
  closeModal: () => void;
}

export interface Patient {
  id: number;
  name: string;
  lastname: string;
  cel: string;
  insurance: string;
}

const allPatients: React.FC<CreatePatientProps> = ({ closeModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const patients = useSelector((state: RootState) => state.patient.patients);
  console.log("", patients);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const alphabeticalPatients = patients.slice().sort((a, b) => {
    const lastNameComparison = a.lastname.localeCompare(b.lastname);
    if (lastNameComparison === 0) {
      return a.name.localeCompare(b.name);
    }
    return lastNameComparison;
  });
  
  //delete
  const handleDelete = async (id: number) => {
    try {
     const response = await dispatch(deletePatient({id}));
     console.log(response);
    if(response.type === 'patients/deletePatient/fulfilled'){
        await dispatch(getPatients()) 
    }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  //edit
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const toggleModalEdit = () => {
    setIsModalOpenEdit(!isModalOpenEdit);
  };
  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    toggleModalEdit();
  };

  return (
    <main className="fixed inset-0 flex flex-col justify-center items-center bg-lightGray bg-opacity-50 p-8">
      <section className='bg-white w-full h-full rounded-xl'>
        <div className='flex flex-col justify-start items-center bg-lightBlue w-full h-[6em] rounded-t-lg'>
          <div className="flex items-center justify-end w-full p-3">
            <button className="" onClick={closeModal}>
              <GrClose />
            </button>
          </div>
          <h1 className="font-extrabold text-4xl font-serif text-darkBlue ">Pacientes</h1>
        </div>

        <div className='w-full h-[1px] bg-darkBlue'></div>
        <section className='overflow-y-scroll flex flex-col gap-2 items-center align-middle'>
          {alphabeticalPatients && alphabeticalPatients.length > 0 ? (
            alphabeticalPatients.map((patient: any) => {
              return (
                <article key={patient.id} className='w-full flex flex-row justify-between items-center align-middle h-[2em] bg-lightGray p-7 text-center '>
                  <h1 className='text-md font-semibold font-serif '>{patient.lastname} {patient.name}</h1>
                  <h1 className='text-md font-semibold font-serif '>{patient.id} </h1>
                  <h1 className='text-md font-semibold font-serif '>{patient.cel}</h1>
                  <h1 className='text-md font-semibold font-serif '>{patient.insurance}</h1>
                  <div className=''>
                    <button >
                      <TiPencil className='text-2xl text-black' onClick={() => handleEdit(patient)} />
                    </button>
                    <button >
                      <TiDelete onClick={() => handleDelete(patient.id)} className='text-2xl text-red-800' />
                    </button>
                  </div>
                </article>
              )
            })
          ) : (
            <h1>Debes crear pacientes</h1>
          )}
        </section>
      </section>
      {isModalOpenEdit && <EditPatient closeModal={toggleModalEdit} selectedPatient={selectedPatient} />}
    </main>
  )
}

export default allPatients;
