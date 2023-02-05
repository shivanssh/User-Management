import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  clearError,
  deleteUserRequested,
} from '../../redux/features/usersSlice';
import './TableView.scss';
import CustomButton from './../CustomButton/CustomButton';
import { User } from '../../types';
import { deleteUserToast, errorToast } from './../../utils/helper';
import { useAppSelector, useAppDispatch } from '../../hooks/dispatchSelection';

const DATA_LABELS = ['Sr No.', 'Name', 'Email', 'Address', 'Actions'];

interface IProps {
  users: User[];
}

const TableView = ({ users }: IProps) => {
  const dispatch = useAppDispatch();
  const { error, isUserDeleted } = useAppSelector((state) => state.users);

  const handleDelete = (id: any) => {
    dispatch(deleteUserRequested(id));
  };

  const actionsButtons = (id: number) => {
    return (
      <div className='actionOptions'>
        <Link to={`/updateUser/${id}`}>
          <CustomButton>Edit</CustomButton>
        </Link>
        <CustomButton onClick={() => handleDelete(id)}>Delete</CustomButton>
      </div>
    );
  };

  useEffect(() => {
    error && (errorToast(), dispatch(clearError()));
    isUserDeleted && deleteUserToast();
  }, [error, isUserDeleted]);

  return (
    <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            {DATA_LABELS.map((label, idx) => (
              <th key={idx}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, idx: number) => {
            const { id, name, address, email } = user;
            return (
              <tr key={id}>
                <td data-label='Sr No.'>{idx + 1}</td>
                <td data-label='Name'>{name}</td>
                <td data-label='Email'>{email}</td>
                <td data-label='Address'>{address}</td>
                <td data-label='Actions'>{actionsButtons(id)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
