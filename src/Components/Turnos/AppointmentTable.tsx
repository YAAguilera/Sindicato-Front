import React, { useState } from 'react';
import CreateAppointment from './Modals/CreateAppointment';
import CreatePatient from '../Patients/PatientModal';

const AppointmentTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState<boolean>(false); // Agrega un estado para el modal de creación de pacientes

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const togglePatientModal = () => {
    setIsPatientModalOpen(!isPatientModalOpen); // Cambia el estado del modal de creación de pacientes
  };

  return (
    <main className="flex flex-col justify-center items-center align-middle gap-4">
      <h1 className="font-extrabold text-4xl font-serif text-darkBlue">Turnos</h1>
      <section>tabla de turnos</section>
      <section className="flex flex-row gap-5 justify-center items-center align-middle">
        <button
          onClick={togglePatientModal} // Abre el modal de creación de pacientes al hacer clic en el botón
          className="p-2 bg-darkBlue rounded-xl text-white font-serif font-semibold
            transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue"
        >
          Crear paciente
        </button>

        <button
          onClick={toggleModal}
          className="p-2 bg-darkBlue rounded-xl text-white font-serif font-semibold
            transition-all duration-500 ease-in-out hover:transform hover:scale-110 hover:bg-lightBlue"
        >
          Crear turno
        </button>
      </section>
      {isModalOpen && <CreateAppointment closeModal={toggleModal} />}
      {isPatientModalOpen && <CreatePatient closeModal={togglePatientModal} />} {/* Agrega el modal de creación de pacientes */}
    </main>
  );
}

export default AppointmentTable;
