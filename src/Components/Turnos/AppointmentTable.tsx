import React, { useState } from 'react';
import CreateAppointment from './Modals/CreateAppointment';
import CreatePatient from '../Patients/CreatePatientModal';
import AllPatientsComponent from '../Patients/GetPatientsModal';

const AppointmentTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState<boolean>(false); // Agrega un estado para el modal de creación de pacientes
  const [isGetPatsModalOpen, setIsGetPatsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const togglePatientModal = () => {
    setIsPatientModalOpen(!isPatientModalOpen); // Cambia el estado del modal de creación de pacientes
  };

  const toggleGetPatsModal = () => {
    setIsGetPatsModalOpen(!isGetPatsModalOpen); // Cambia el estado del modal de creación de pacientes
  };
  return (
    <main className="flex flex-col justify-center items-center align-middle gap-4 
    xxl:w-[70%] 
    xl:w-[70%]
    lg:w-[70%]
    md:w-[70%]
    sm:w-full
    ">
      <h1 className="font-extrabold font-serif text-darkBlue 
      xxl:text-6xl
      xl:text-5xl
      lg:text-4xl
      md:text-3xl
      sm:text-3xl
      ">Turnos</h1>
      <section>tabla de turnos</section>
      <section className="flex flex-row gap-5 justify-center items-center align-middle">
      <button
          onClick={toggleGetPatsModal}
          className=" bg-darkBlue rounded-xl text-white font-serif font-semibold
            transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue
            xxl:p-2 xxl:text-2xl
            xl:p-2 xl:text-xl
            lg:p-2 lg:text-md
            md:p-2 md:text-xs
            sm:p-1 sm:text-xs
            "
        >
          Ver Pacientes
        </button>
        <button
          onClick={togglePatientModal} 
          className="bg-darkBlue rounded-xl text-white font-serif font-semibold
            transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue
            xxl:p-2 xxl:text-2xl
            xl:p-2 xl:text-xl
            lg:p-2 lg:text-md
            md:p-2 md:text-xs
            sm:p-1 sm:text-xs
            "
        >
          Crear paciente
        </button>

        <button
          onClick={toggleModal}
          className=" bg-darkBlue rounded-xl text-white font-serif font-semibold
            transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue
            xxl:p-2 xxl:text-2xl
            xl:p-2 xl:text-xl
            lg:p-2 lg:text-md
            md:p-2 md:text-xs
            sm:p-1 sm:text-xs
            "
        >
          Crear turno
        </button>
      </section>
      {isModalOpen && <CreateAppointment closeModal={toggleModal} />}
      {isPatientModalOpen && <CreatePatient closeModal={togglePatientModal} />} 
      {isGetPatsModalOpen && <AllPatientsComponent closeModal={toggleGetPatsModal}/>} 

    </main>
  );
}

export default AppointmentTable;
