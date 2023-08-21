import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "../Slices/doctorSlice";
import patientsReducer from "../Slices/patientsSlice";

export const store=configureStore({
    reducer: {
      doctor: doctorReducer,
      patient: patientsReducer,
      },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch