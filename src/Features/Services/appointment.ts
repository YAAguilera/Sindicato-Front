import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Doctor {
    id: string;
    name: string;
    lastname: string;
    speciality: string;
  }

  interface Patient {
    id: number;
    name: string;
    lastname: string;
    cel: string;
    insurance: string;
  }

interface Appointment {
  id: string,
  fecha: string,
  hora: string,
  pacienteId: number,
  doctorId:string,   
  Paciente: Patient,
  Doctor: Doctor
}

export const getAppointments = createAsyncThunk<Appointment[], void, { rejectValue: string }>(
  'Appointment/getAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Appointment[]>(
        'https://sindicato-back-35yh-sist-dev.fl0.io/appointments' 
      );
      console.log("este es el response de getAppointments",response.data)
      return response.data; 
    } catch (error) {
      return rejectWithValue('No se pudieron obtener los Appointmentes.');
    }
  }
);

export const postAppointment = createAsyncThunk<Appointment[], { pacienteId:number, doctorId:string, hora:string, fecha:string }, { rejectValue: string }>(
  'Appointments/postAppointment',
  async ({ pacienteId, doctorId, hora, fecha }, { rejectWithValue }) => {
    try {
      console.log("esto llega a ldipsatch", pacienteId, doctorId, hora, fecha);
      
      const response = await axios.post<Appointment[]>(
        `https://sindicato-back-35yh-sist-dev.fl0.io/appointments/${pacienteId}`,
        {
          doctorId,
          hora,
          fecha
        }
      );
      console.log('turno creado', response.data)
      return response.data; 
    } catch (error) {
      return rejectWithValue('No se pudo crear');
    }
  }
); 

export const deleteAppointments = createAsyncThunk<Appointment[], {  id: string }, { rejectValue: string }>(
  'Appointment/deleteAppointments',
  async ( {id} , { rejectWithValue }) => {
    try {
      const response = await axios.delete<Appointment[]>(
        `https://sindicato-back-35yh-sist-dev.fl0.io/appointments/${id}`
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue('No se pudo eliminar');
    }
  }
); 