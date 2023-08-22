import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  lastname: string;
  cel: string;
  insurance: string;
}

export const getPatients = createAsyncThunk<Patient[], void, { rejectValue: string }>(
    'patients/getPatients',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get<Patient[]>(
          'http://localhost:3001/patients' 
        );
        console.log("este es el response de getPatient",response.data)
        return response.data; 
      } catch (error) {
        return rejectWithValue('No se pudieron obtener los pacientes.');
      }
    }
  );

  export const postPatient = createAsyncThunk<Patient[], { id: number, name: string, lastname: string, cel: string, insurance: string; }, { rejectValue: string }>(
    'patients/postPatient',
    async ({ id, name, lastname, cel, insurance }, { rejectWithValue }) => {
      try {
        const response = await axios.post<Patient[]>(
          'http://localhost:3001/patients',
          {
            id,
            name,
            lastname,
            cel,
            insurance
          }
        );
        console.log('paciente creado', response.data)
        return response.data; 
      } catch (error) {
        return rejectWithValue('No se pudo crear');
      }
    }
  ); 

  export const deletePatient = createAsyncThunk<Patient[], {  id: number }, { rejectValue: string }>(
    'patients/deletePatient',
    async ( {id} , { rejectWithValue }) => {
      try {
        const response = await axios.delete<Patient[]>(
          `http://localhost:3001/patients/${id}`
        );
        return response.data; 
      } catch (error) {
        return rejectWithValue('No se pudo eliminar');
      }
    }
  ); 

  export const putPatients = createAsyncThunk<Patient[], {  id: number, name: string; lastname: string, cel: string, insurance: string }, { rejectValue: string }>(
    'patient/putPatient',
    async ( {id, name, lastname, cel, insurance } , { rejectWithValue }) => {
      try {
        const response = await axios.put<Patient[]>(
          `http://localhost:3001/patients/${id}`,{
            id, name, lastname, cel, insurance
          }
        );
        console.log(response);
        
        return response.data; 
      } catch (error) {
        return rejectWithValue('No se pudo editar');
      }
    }
  ); 