import { createSlice } from '@reduxjs/toolkit';
import { State } from '../../types';

const initialState: State = {
  isLoading: false,
  users: [],
  error: '',
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequested: (state) => {
      state.isLoading = true;
    },
    fetchUsersSucceeded: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    addUserRequested: (state) => {
      state.isLoading = true;
    },
    addUserSucceeded: (state) => {
      state.isLoading = false;
    },
    deleteUserRequested: (state) => {
      state.isLoading = true;
    },
    deleteUserSucceeded: (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      state.isLoading = false;
      // state.users = state.users.map((user) =>
      //   user.id === action.payload.id ? action.payload : user
      // );
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequested,
  fetchUsersSucceeded,
  addUserRequested,
  addUserSucceeded,
  deleteUserRequested,
  deleteUserSucceeded,
  updateUser,
  setError,
} = users.actions;

export default users.reducer;
