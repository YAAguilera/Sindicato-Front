import { createSlice } from '@reduxjs/toolkit';
import { getPatients } from '../Services/patients';

interface Patient {
    id: number;
    name: string;
    lastname: string;
    cel: number;
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
    },
});

export default patientSlice.reducer;