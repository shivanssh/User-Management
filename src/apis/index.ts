import axios from 'axios';
import { PageInfo, User } from '../types';

axios.defaults.baseURL = 'http://localhost:8080';

export const fetchUsersApi = async ({
  pageCount,
  pageLimit,
  searchQuery,
}: PageInfo) =>
  await axios.get(
    `users?q=${pageCount}&_page=${pageLimit}&_limit=${searchQuery}`
  );

export const addUserApi = async (user: User) =>
  await axios.post('/users', user);

export const deleteUserApi = async (userId: number) =>
  await axios.delete(`/users/${userId}`);

export const updateUserApi = async (user: User) =>
  await axios.put(`/users/${user.id}`, user);
