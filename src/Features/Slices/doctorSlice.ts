import { createSlice } from '@reduxjs/toolkit';
import { getDoctors, postDoctors, deleteDoctors, putDoctors, getDoctorsById } from '../Services/doctors';
import Swal from 'sweetalert2'
interface Doctor {
  id: string;
  name: string;
  lastname: string;
  speciality:string;
}

interface DoctorId {
  id: string;
  name: string;
  lastname: string;
  speciality:string;
}

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctors: [] as Doctor[],
    doctorId: [] as DoctorId[],
    status: 'idle',
    error: '',
  },
  reducers: {
    resetDoctorId: (state) => {
      state.doctorId = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error desconocido';
      })
      .addCase(getDoctorsById.rejected, (state)=>{
        state.status = 'failed';
      })
      .addCase(getDoctorsById.fulfilled, (state, action)=>{
        state.status = 'succeeded';
        state.doctorId = action.payload;
      })
      .addCase(postDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postDoctors.fulfilled, (state, action) => {
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
          title: "Doctor creado con éxito!",
        });
        if (Array.isArray(action.payload)) {
          state.doctors = state.doctors.concat(action.payload);
        } else {
          state.doctors = state.doctors.concat([action.payload]);
        }
      })
      .addCase(postDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error desconocido';
      })
      .addCase(deleteDoctors.fulfilled, (state)=>{
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
          title: "Doctor eliminado con éxito!",
        });
      })
      .addCase(putDoctors.fulfilled, (state)=>{
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
          title: "Doctor modificado con éxito!",
        });
      })
  },
});
export const { resetDoctorId } = doctorSlice.actions;

export default doctorSlice.reducer;
