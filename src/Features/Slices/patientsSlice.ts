import { createSlice } from '@reduxjs/toolkit';
import { getPatients, postPatient, deletePatient, putPatients } from '../Services/patients';
import Swal from 'sweetalert2'

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
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Paciente creado con éxito!",
        });
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
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Paciente eliminado con éxito!",
        });
      })
      .addCase(putPatients.fulfilled, (state)=>{
        state.status='fulfilled'
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Paciente modificado con éxito!",
        });
      })
    },
});

export default patientSlice.reducer;