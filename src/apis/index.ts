import axios from 'axios';
import { Paginate, User } from '../types';

axios.defaults.baseURL = 'http://localhost:8080';

export const fetchUsersApi = async ({ page, limit }: Paginate) =>
  await axios.get(`users?_page=${page}&_limit=${limit}`);

export const addUserApi = async (user: User) =>
  await axios.post('/users', user);

export const deleteUserApi = async (userId: number) =>
  await axios.delete(`/users/${userId}`);

export const updateUserApi = async (user: User) =>
  await axios.put(`/users/${user.id}`, user);
