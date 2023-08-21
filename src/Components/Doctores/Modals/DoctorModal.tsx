import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { postDoctors } from '../../../Features/Services/doctors';
import { AppDispatch } from '../../../Features/store/store';

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
  const { register, handleSubmit, formState } = useForm<DoctorFormData>();
  const dispatch=useDispatch<AppDispatch>()

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
          <input type="text" {...register('name')} placeholder=" Nombre" className="p-1 rounded-lg bg-lightGray placeholder-black" />
          <input type="text" {...register('lastname')} placeholder=" Apellido" className="p-1 rounded-lg bg-lightGray placeholder-black" />
          <input type="text" {...register('speciality')} placeholder=" Especialidad" className="p-1 rounded-lg bg-lightGray placeholder-black" />
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="p-2 bg-darkBlue rounded-xl text-white font-serif font-semibold transition-all duration-500 ease-in-out hover:transform hover:scale-110"
          >
            Crear
          </button>
        </form>
      </section>
    </main>
  );
}

export default CreateDoctor;
