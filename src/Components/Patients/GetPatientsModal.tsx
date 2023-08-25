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
import Swal from 'sweetalert2'
import SearchBar from '../Assets/SearchBar'

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
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder]=useState("")

  useEffect(() => {
    dispatch(getPatients());
    setPlaceholder("Buscar nombre/DNI")
  }, [dispatch]);

  const alphabeticalPatients = patients.slice().sort((a, b) => {
    const lastNameComparison = a.lastname.localeCompare(b.lastname);
    if (lastNameComparison === 0) {
      return a.name.localeCompare(b.name);
    }
    return lastNameComparison;
  });

  const handleSearch = (event:any) => {
    setSearchTerm(event.target.value);
  };
  
  //delete
  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title:
          "¿Estás seguro que quieres eliminar este paciente? Esta acción no se puede deshacer.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        const response = await dispatch(deletePatient({id}));
        console.log(response);
    if(response.type === 'patients/deletePatient/fulfilled'){
        await dispatch(getPatients()) 
    }
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

  const filteredPatients = alphabeticalPatients.filter((patient) => {
    const searchTermLower = searchTerm.toLowerCase();
    
    // Comprobación de coincidencia en nombre, ID y apellido
    const nameMatches = patient.name.toLowerCase().includes(searchTermLower);
    const idMatches = patient.id.toString().includes(searchTermLower);
    const lastnameMatches = patient.lastname.toLowerCase().includes(searchTermLower);
  
    // Devuelve true si alguna de las condiciones coincide
    return nameMatches || idMatches || lastnameMatches;
  });

  return (
    <main className="fixed inset-0 flex flex-col justify-center items-center bg-lightGray bg-opacity-50 p-8">
      <div className='flex flex-col justify-start items-center bg-lightBlue w-full h-[6em] rounded-t-lg'>
          <div className="flex items-center justify-end w-full p-3">
            <button className="" onClick={closeModal}>
              <GrClose />
            </button>
          </div>
          <div className='flex flex-row gap-5 items-center justify-center'>
          <h1 className="font-extrabold text-4xl font-serif text-darkBlue ">Pacientes</h1>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} placeHolder={placeholder}/>
          </div>
        </div>
      <section className='bg-lightGray overflow-y-scroll w-full h-full rounded-b-xl'>
        <div className='w-full  h-[1px] bg-darkBlue'></div>
        <section className=' flex flex-col gap-2 p-2 items-center align-middle'>
          {filteredPatients && filteredPatients.length > 0 ? (
            filteredPatients.map((patient: any) => {
              return (
                <article key={patient.id} className='w-full flex rounded-xl flex-row justify-between items-center align-middle h-[2em] bg-white p-7 text-center '>
                  <h1 className='font-semibold  xxl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs'>{patient.lastname} {patient.name}</h1>
                  <h1 className='xxl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs font-semibold  '>{patient.id} </h1>
                  <h1 className='xxl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs font-semibold  '>{patient.insurance}</h1>
                  <h1 className='xxl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs font-semibold  '>{patient.cel}</h1>
                  <div className=''>
                    <button >
                      <TiPencil className=' text-black xxl:text-4xl
                xl:text-3xl
                lg:text-2xl
                md:text-xl
                sm:text-2xl' onClick={() => handleEdit(patient)} />
                    </button>
                    <button >
                      <TiDelete onClick={() => handleDelete(patient.id)} className='text-red-800
                      xxl:text-4xl
                      xl:text-3xl
                      lg:text-2xl
                      md:text-xl
                      sm:text-2xl
                      ' />
                    </button>
                  </div>
                </article>
              )
            })
          ) : (
            <h1>No hay pacientes</h1>
          )}
        </section>
      </section>
      {isModalOpenEdit && <EditPatient closeModal={toggleModalEdit} selectedPatient={selectedPatient} />}
    </main>
  )
}

export default allPatients;
