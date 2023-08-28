import './App.css'
import Home from '../src/Views/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import DoctorPrint from './Components/Doctores/DoctorPrint'

function App() {

  return (
    <BrowserRouter>
  <Routes>
       <Route path='/' Component={Home}/>
       <Route path='/doctor/:id' Component={DoctorPrint}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
