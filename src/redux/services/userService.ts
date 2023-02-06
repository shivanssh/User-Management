import { User } from '../../types';
import {
  addUserApi,
  deleteUserApi,
  fetchUsersApi,
  updateUserApi,
} from './../../apis/index';

export const fetchUsers = async () => {
  return await fetchUsersApi();
};

export const addUser = async (user: User) => {
  return await addUserApi(user);
};

export const deleteUser = async (userId: number) => {
  return await deleteUserApi(userId);
};

export const updateUser = async (user: User) => {
  return await updateUserApi(user);
};
