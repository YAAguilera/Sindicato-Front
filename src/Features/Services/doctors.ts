import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Doctor {
  id: string;
  name: string;
  lastname: string;
  speciality: string;
}

interface DoctorId {
  id: string;
  name: string;
  lastname: string;
  speciality:string;
}

export const getDoctors = createAsyncThunk<Doctor[], void, { rejectValue: string }>(
  'doctor/getDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Doctor[]>(
        'https://sindicato-back-35yh-sist-dev.fl0.io/doctors' 
      );
      console.log("este es el response de getDoctors",response.data)
      return response.data; 
    } catch (error) {
      return rejectWithValue('No se pudieron obtener los doctores.');
    }
  }
);

export const postDoctors = createAsyncThunk<Doctor[], {  name: string; lastname: string, speciality:string }, { rejectValue: string }>(
  'doctor/postDoctors',
  async ({ name, lastname, speciality }, { rejectWithValue }) => {
    try {
      const response = await axios.post<Doctor[]>(
        'https://sindicato-back-35yh-sist-dev.fl0.io/doctors',
        {
          name,
          lastname,
          speciality,
        }
      );
      console.log('doc creado', response.data)
      return response.data; 
    } catch (error) {
      return rejectWithValue('No se pudo crear');
    }
  }
); 

export const deleteDoctors = createAsyncThunk<Doctor[], {  id: string }, { rejectValue: string }>(
  'doctor/deleteDoctors',
  async ( {id} , { rejectWithValue }) => {
    try {
      const response = await axios.delete<Doctor[]>(
        `https://sindicato-back-35yh-sist-dev.fl0.io/doctors/${id}`
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue('No se pudo eliminar');
    }
  }
); 

export const putDoctors = createAsyncThunk<Doctor[], {  id: string, name: string; lastname: string, speciality:string }, { rejectValue: string }>(
  'doctor/putDoctors',
  async ( {id, name, lastname, speciality } , { rejectWithValue }) => {
    try {
      const response = await axios.put<Doctor[]>(
        `https://sindicato-back-35yh-sist-dev.fl0.io/doctors/${id}`,{
          name, lastname, speciality
        }
      );
      console.log(response);
      
      return response.data; 
    } catch (error) {
      return rejectWithValue('No se pudo editar');
    }
  }
); 


export const getDoctorsById = createAsyncThunk<DoctorId[], string>(
  'doctor/getByIdDoctors',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<DoctorId[]>(
        `https://sindicato-back-35yh-sist-dev.fl0.io/doctors/${id}`
      );
      console.log("este es el response de getDoctorById", response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue('No se pudieron obtener los doctores.');
    }
  }
);
