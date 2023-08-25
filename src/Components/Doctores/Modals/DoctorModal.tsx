import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { postDoctors } from '../../../Features/Services/doctors';
import { AppDispatch, RootState } from '../../../Features/store/store';

interface CreateDoctorProps {
  closeModal: () => void;
}

interface DoctorFormData {
  id: string;
  name: string;
  lastname: string;
  speciality: string;
}

const CreateDoctor: React.FC<CreateDoctorProps> = ({ closeModal }) => {
  const { register, handleSubmit, formState, formState: { errors }, trigger } = useForm<DoctorFormData>();

  const handleBlur = (fieldName: any) => {
    trigger(fieldName);
  };

  const dispatch=useDispatch<AppDispatch>()

  const loading = useSelector((state:RootState)=>state.doctor.status)

  //Post
  const onSubmit = async (data: DoctorFormData) => {
    try {
      const { name, lastname, speciality } = data;

      const actionResult = await dispatch(postDoctors({
        name,
        lastname,
        speciality,
      }));

      if (postDoctors.fulfilled.match(actionResult)) {
        closeModal();
      } else if (postDoctors.rejected.match(actionResult)) {
        console.error('Error creating doctor:', actionResult.error.message);
        // Handle error if necessary
      }
    } catch (error) {
      console.error('Error creating doctor:', error);
      // Handle error if necessary
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
        <h1 className="font-extrabold text-2xl font-serif text-white">Crear Doctor</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <input type="text"  placeholder=" Nombre" className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('name', {
             required: 'Este campo es obligatorio',
             pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Solo se aceptan letras',
            },
          }) 
        }
        onBlur={() => handleBlur('name')}
        />
         {errors.name ? (
                <span className='text-red-500 text-xs text-center '>{errors.name.message}</span>
              ) : (
                <></>
              )}
          <input type="text" placeholder=" Apellido" className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('lastname', {
             required: 'Este campo es obligatorio',
             pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Solo se aceptan letras',
            },
          }) 
          
        }
        onBlur={() => handleBlur('lastname')}
        
        />
         {errors.lastname ? (
                <span className='text-red-500 text-xs text-center'>{errors.lastname.message}</span>
              ) : (
                <></>
              )}

        
          <input type="text" placeholder=" Especialidad" className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('speciality', {
             required: 'Este campo es obligatorio',
             pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Solo se aceptan letras',
            },
          }) 
          
        }
        onBlur={() => handleBlur('speciality')}
        
        />
         {errors.speciality ? (
                <span className='text-red-500 text-xs text-center '>{errors.speciality.message}</span>
              ) : (
                <></>
              )}

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

export default CreateDoctor;
