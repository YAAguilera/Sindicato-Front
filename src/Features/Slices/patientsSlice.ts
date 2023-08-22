import { createSlice } from '@reduxjs/toolkit';
import { getPatients, postPatient, deletePatient, putPatients } from '../Services/patients';

interface Patient {
    id: number;
    name: string;
    lastname: string;
    cel: string;
    insurance: string;
  }

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    patients: [] as Patient[],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error desconocido';
      })
      .addCase(postPatient.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postPatient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(action.payload)) {
          state.patients = state.patients.concat(action.payload);
        } else {
          state.patients = state.patients.concat([action.payload]);
        }
      })
      .addCase(postPatient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error desconocido';
      })
      .addCase(deletePatient.fulfilled, (state)=>{
        state.status='fulfilled'
      })
      .addCase(putPatients.fulfilled, (state)=>{
        state.status='fulfilled'
      })
    },
});

export default patientSlice.reducer;