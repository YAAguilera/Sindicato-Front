import { createSlice } from '@reduxjs/toolkit';
import { getAppointments, postAppointment, deleteAppointments, putAppointment } from '../Services/appointment';


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

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [] as Appointment[],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error desconocido';
      })
       .addCase(postAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(action.payload)) {
          state.appointments = state.appointments.concat(action.payload);
        } else {
          state.appointments = state.appointments.concat([action.payload]);
        }
      })
      .addCase(postAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error desconocido';
      })
      .addCase(deleteAppointments.fulfilled, (state)=>{
        state.status='fulfilled'
      })
      .addCase(putAppointment.fulfilled, (state)=>{
        state.status='fulfilled'
      })
  },
});

export default appointmentSlice.reducer;
