import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, State } from './../../types.d';

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
    fetchUsersSucceeded: (state, action: PayloadAction<User[]>) => {
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
    deleteUserSucceeded: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state) => {
      state.isLoading = false;
    },

    setError: (state, action: PayloadAction<string>) => {
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
