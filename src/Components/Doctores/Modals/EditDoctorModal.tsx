import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { getDoctors, putDoctors } from '../../../Features/Services/doctors';
import { AppDispatch } from '../../../Features/store/store';

export interface Doctor {
    id: string;
    name: string;
    lastname: string;
    speciality: string;
  }

interface editDoctorProps {
    closeModal: () => void;
    selectedDoctor: Doctor | null; // Agrega el prop aquí
  }
  
  interface DoctorFormData {
    id: string;
    name: string;
    lastname: string;
    speciality: string;
  }
  
  const EditDoctor: React.FC<editDoctorProps> = ({ closeModal, selectedDoctor  }) => {
    const { register, handleSubmit, trigger } = useForm<DoctorFormData>();

    const handleBlur = (fieldName: any) => {
      trigger(fieldName);
    };
  

    const dispatch=useDispatch<AppDispatch>()

    const initialValues: DoctorFormData = {
        id: selectedDoctor?.id || "",
        name: selectedDoctor?.name || "",
        lastname: selectedDoctor?.lastname || "",
        speciality: selectedDoctor?.speciality || "",
      };
      const onSubmit = async (data: DoctorFormData) => {
        try {
            console.log(data);
            const { name, lastname, speciality} = data;
          const response = await dispatch(
            putDoctors({
              id:initialValues.id,
              name,
              lastname,
              speciality,
            })
          );
             if(response.type==='doctor/putDoctors/fulfilled'){
               await dispatch(getDoctors())
             }
             
          if (putDoctors.fulfilled.match(response)) {
            // La edición fue exitosa, puedes cerrar el modal aquí si lo deseas
            closeModal();
          } else {
            // Handle errores o mostrar mensajes de error si es necesario
          }
        } catch (error) {
          // Manejar errores de la llamada
          console.error('Error al editar el doctor:', error);
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
      <h1 className="font-extrabold text-2xl font-serif text-white">Editar Doctor</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
        <input type="text"  defaultValue={initialValues.speciality} className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('speciality', {
           required: 'Este campo es obligatorio'
          }) 
        }
        onBlur={() => handleBlur('speciality')}
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

export default EditDoctor