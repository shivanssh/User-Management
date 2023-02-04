import { toast } from 'react-toastify';

const AUTO_CLOSE = 1000;

export const isObjectEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

export const errorToast = () =>
  toast.error('Something went wrong!', {
    toastId: 'error',
    autoClose: AUTO_CLOSE,
  });

export const addUserToast = () =>
  toast.success('User added successfully!', {
    toastId: 'updateUser',
    autoClose: 1000,
  });

export const updateUserToast = () =>
  toast.success('User updated successfully!', {
    toastId: 'addUser',
    autoClose: AUTO_CLOSE,
  });

export const deleteUserToast = () => {
  toast.success('User deleted successfully!', {
    toastId: 'delete',
    autoClose: AUTO_CLOSE,
  });
};
