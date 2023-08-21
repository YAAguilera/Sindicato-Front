import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Doctor {
  id: string;
  name: string;
  lastname: string;
  speciality: string;
}

export const getDoctors = createAsyncThunk<Doctor[], void, { rejectValue: string }>(
  'doctor/getDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Doctor[]>(
        'http://localhost:3001/doctors' 
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
        'http://localhost:3001/doctors',
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
        `http://localhost:3001/doctors/${id}`
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
        `http://localhost:3001/doctors/${id}`,{
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