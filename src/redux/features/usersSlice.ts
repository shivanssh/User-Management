import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, State } from './../../types.d';

const initialState: State = {
  isLoading: false,
  users: [],
  error: '',
  isUsersListUpdated: false,
  isUserDeleted: false,
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequested: (state) => {
      state.isLoading = true;
      state.error = '';
      state.isUsersListUpdated = false;
      state.isUserDeleted = false;
    },
    fetchUsersSucceeded: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = '';
      state.isUsersListUpdated = false;
      state.isUserDeleted = false;
    },
    addUserRequested: (state) => {
      state.isLoading = true;
      state.error = '';
      state.isUserDeleted = false;
    },
    addUserSucceeded: (state) => {
      state.isLoading = false;
      state.error = '';
      state.isUsersListUpdated = true;
      state.isUserDeleted = false;
    },
    deleteUserRequested: (state, action) => {
      state.isLoading = true;
      state.error = '';
      state.isUserDeleted = false;
    },
    deleteUserSucceeded: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.error = '';
      state.isUserDeleted = true;
    },
    updateUserRequested: (state) => {
      state.isLoading = true;
      state.error = '';
      state.isUserDeleted = false;
    },
    updateUserSucceeded: (state) => {
      state.isLoading = false;
      state.error = '';
      state.isUsersListUpdated = true;
      state.isUserDeleted = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
      state.isLoading = false;
      state.isUserDeleted = false;
      state.isUsersListUpdated = false;
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
  updateUserRequested,
  updateUserSucceeded,
  setError,
  clearError,
} = users.actions;

export default users.reducer;
