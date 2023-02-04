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
    },
    fetchUsersSucceeded: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.isUsersListUpdated = false;
      state.isUserDeleted = false;
      state.users = action.payload;
      state.error = '';
    },
    addUserRequested: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    addUserSucceeded: (state) => {
      state.isLoading = false;
      state.error = '';
      state.isUsersListUpdated = true;
    },
    deleteUserRequested: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    deleteUserSucceeded: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.isUserDeleted = true;
      state.error = '';
    },
    updateUserRequested: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    updateUserSucceeded: (state, action) => {
      state.isLoading = false;
      state.isUsersListUpdated = true;
      state.error = '';
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
  updateUserRequested,
  updateUserSucceeded,
  setError,
} = users.actions;

export default users.reducer;
