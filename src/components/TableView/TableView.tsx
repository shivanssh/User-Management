import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUserRequested } from '../../redux/features/usersSlice';
import './TableView.scss';
import CustomButton from './../CustomButton/CustomButton';
import { User } from '../../types';

const DATA_LABELS = ['Sr No.', 'Name', 'Email', 'Address', 'Actions'];

interface IProps {
  users: User[];
}

const TableView = ({ users }: IProps) => {
  const dispatch = useDispatch();
  const handleDelete = (id: any) => {
    dispatch(deleteUserRequested(id));
    toast.success('User deleted successfully!');
  };

  const ActionsButtons = (id: number) => {
    return (
      <div className='actionOptions'>
        <Link to={`/updateUser/${id}`}>
          <CustomButton>Edit</CustomButton>
        </Link>{' '}
        <CustomButton onClick={() => handleDelete(id)}>Delete</CustomButton>
      </div>
    );
  };

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
                <td data-label='Actions'>{ActionsButtons(id)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
