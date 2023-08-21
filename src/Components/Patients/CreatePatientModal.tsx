import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';

interface CreatePatientProps {
  closeModal: () => void;
}

interface PatientFormData {
    DNI: number;
    Nombre: string
    Apellido: string
    Telefono: number;
    ObraSocial: string
}

const CreatePatient: React.FC<CreatePatientProps> = ({ closeModal }) => {
  const { register, handleSubmit, formState } = useForm<PatientFormData>();

  const onSubmit: SubmitHandler<PatientFormData> = (data) => {
    console.log(data);
    closeModal();
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
          <input type="text" {...register('DNI')} placeholder=" DNI" className="p-1 rounded-lg bg-lightGray placeholder-black" />
          <input type="text" {...register('Nombre')} placeholder=" Nombre" className="p-1 rounded-lg bg-lightGray placeholder-black" />
          <input type="text" {...register('Apellido')} placeholder=" Apellido" className="p-1 rounded-lg bg-lightGray placeholder-black" />
          <input type="text" {...register('Telefono')} placeholder=" Teléfono" className="p-1 rounded-lg bg-lightGray placeholder-black" />
          <input type="text" {...register('ObraSocial')} placeholder=" Obra social" className="p-1 rounded-lg bg-lightGray placeholder-black" />
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

export default CreatePatient;
