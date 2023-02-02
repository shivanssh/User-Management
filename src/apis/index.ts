import axios from 'axios';
import { User } from '../types';

axios.defaults.baseURL = 'http://localhost:8080';

export const fetchUsersApi = async () => await axios.get('/users');

export const addUserApi = async (user: User) =>
  await axios.post('/users', user);

export const deleteUserApi = async (userId: number) =>
  await axios.delete(`/users/${userId}`);

export const updateUserApi = async (user: User) =>
  await axios.put(`/users/${user.id}`, user);
