import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { getPatients, putPatients } from '../../Features/Services/patients';
import { AppDispatch } from '../../Features/store/store';

interface Patient {
    id: number;
    name: string
    lastname: string
    cel: string;
    insurance: string
}

interface PatientFormData {
    id: number;
    name: string
    lastname: string
    cel: string;
    insurance: string
}

interface editPatientProps {
    closeModal: () => void;
    selectedPatient: Patient | null; // Agrega el prop aquí
  }
  

  const EditPatient: React.FC<editPatientProps> = ({ closeModal, selectedPatient  }) => {
    const { register, handleSubmit, trigger } = useForm<PatientFormData>();

    const handleBlur = (fieldName: any) => {
      trigger(fieldName);
    };
  

    const dispatch=useDispatch<AppDispatch>()

    const initialValues: PatientFormData = {
        id: typeof selectedPatient?.id === 'number' ? selectedPatient.id : 0,
        name: selectedPatient?.name || "",
        lastname: selectedPatient?.lastname || "",
        cel: selectedPatient?.cel || "",
        insurance: selectedPatient?.insurance || ""
      };
      
      const onSubmit = async (data: PatientFormData) => {
        try {
            console.log('esto es data',data);
            const {  name, lastname, cel, insurance } = data;
          const response = await dispatch(
            putPatients({
              id:initialValues.id,
              name,
              lastname,
              cel, 
              insurance
            })
           );

         

             if(response.type==='patient/putPatient/fulfilled'){
                console.log(response)
               await dispatch(getPatients())
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
      <h1 className="font-extrabold text-2xl font-serif text-white">Editar Paciente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <input type="number"  defaultValue={initialValues.id} className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('id', {
           required: 'Este campo es obligatorio'
          }) 
        }
        onBlur={() => handleBlur('id')}
        />

        <input type="text"  defaultValue={initialValues.name} className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('name', {
           required: 'Este campo es obligatorio'
          }) 
        }
        onBlur={() => handleBlur('name')}
        />

        <input type="text"  defaultValue={initialValues.lastname} className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('lastname', {
           required: 'Este campo es obligatorio'
          }) 
        }
        onBlur={() => handleBlur('lastname')}
        />
        
        <input type="number"  defaultValue={initialValues.cel} className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('cel') 
        }
        onBlur={() => handleBlur('cel')}
        />

        <input type="text"  defaultValue={initialValues.insurance} className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('insurance', {
                required: 'Este campo es obligatorio'
                }) 
                }
                onBlur={() => handleBlur('insurance')}
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

export default EditPatient