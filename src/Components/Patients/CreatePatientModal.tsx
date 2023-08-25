import React from 'react';
import { useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { postPatient } from '../../Features/Services/patients';
import { AppDispatch, RootState } from '../../Features/store/store';
import { useSelector } from 'react-redux';


interface CreatePatientProps {
  closeModal: () => void;
}

interface PatientFormData {
    id: number;
    name: string
    lastname: string
    cel: string;
    insurance: string
}

const CreatePatient: React.FC<CreatePatientProps> = ({ closeModal }) => {
  const { register, handleSubmit, formState, formState: { errors }, trigger } = useForm<PatientFormData>();
  const handleBlur = (fieldName: any) => {
    trigger(fieldName);
  };
  
  const dispatch=useDispatch<AppDispatch>()

  const loading = useSelector((state:RootState)=>state.patient.status)

  //Post
  const onSubmit= async (formData: PatientFormData) => {
    try {
     console.log("form data post",formData);
     
      // Llama a la acción postPatient a través de Redux Toolkit
    const response =  await dispatch(postPatient(formData));
    console.log(response);
    closeModal();
    } catch (error) {
      console.error('Error al crear paciente:', error);
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
        <h1 className="font-extrabold text-2xl font-serif text-white">Crear Paciente</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <input type="number" placeholder=" DNI" className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('id', {
             required: 'Este campo es obligatorio',
             pattern: {
              value: /^[0-9]{8,11}$/,
              message: 'Ingrese un DNI válido',
            },
          }) 
        }
        onBlur={() => handleBlur('id')}
        />
         {errors.id ? (
                <span className='text-red-500 text-xs text-center '>{errors.id.message}</span>
              ) : (
                <></>
              )}

          <input type="text" placeholder=" Nombre" className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('name', {
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
          <input type="text"  placeholder=" Apellido" className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('lastname', {
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
                <span className='text-red-500 text-xs text-center '>{errors.lastname.message}</span>
              ) : (
                <></>
              )}

          <input type="tel" placeholder=" Teléfono" className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('cel',{
            pattern: {
              value: /^[0-9]+$/,
              message: 'Ingrese un número válido',
            },
          }) 
        }
        onBlur={() => handleBlur('cel')}
        />
         {errors.cel ? (
                <span className='text-red-500 text-xs text-center '>{errors.cel.message}</span>
              ) : (
                <></>
              )}
          <input type="text" placeholder=" Obra social" className="p-1 rounded-lg bg-lightGray placeholder-black" {...register('insurance', {
             required: 'Este campo es obligatorio',
             pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Solo se aceptan letras',
            },
          }) 
        }
        onBlur={() => handleBlur('insurance')}
        />
         {errors.insurance ? (
                <span className='text-red-500 text-xs text-center '>{errors.insurance.message}</span>
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

export default CreatePatient;
