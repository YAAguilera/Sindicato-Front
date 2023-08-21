//import React from 'react'
import AppointmentTable from "../Components/Turnos/AppointmentTable"
import DoctorTable from "../Components/Doctores/DoctorTable"

const Home = () => {
  return (
    <main className='overflow-x-hidden bg-gradient-to-t from-lightBlue to-darkBlue w-screen h-screen p-8'>    
          <article className="flex flex-row p-3 bg-white h-full w-auto rounded-xl justify-center gap-4">
             <AppointmentTable/>
             <DoctorTable/>
          </article>
    </main>
  )
}

export default Home