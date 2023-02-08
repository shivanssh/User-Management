import React, { useState, useEffect } from 'react';
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
import Popup from '../Popup/Popup';

const DATA_LABELS = ['Sr No.', 'Name', 'Email', 'Age', 'Address', 'Actions'];

interface IProps {
  users: User[];
}

const TableView = ({ users }: IProps) => {
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const [userEmail, setUserEmail] = useState('');
  const { error, isUserDeleted } = useAppSelector((state) => state.users);

  useEffect(() => {}, [deleteId, showPopup]);

  const deleteConfirmation = (isConfirmed: boolean) => {
    if (isConfirmed) {
      dispatch(deleteUserRequested(Number(deleteId)));
    }
    setShowPopup(false);
  };

  const handleDelete = (id: any) => {
    setShowPopup(true);
    setDeleteId(id);
    const user = users.find((user) => user.id === Number(id));
    user && setUserEmail(user?.email);
  };

  const actionsButtons = (id: number) => (
    <div className='actionOptions'>
      <Link to={`/updateUser/${id}`}>
        <CustomButton>Edit</CustomButton>
      </Link>
      <CustomButton onClick={() => handleDelete(id)}>Delete</CustomButton>
    </div>
  );

  useEffect(() => {
    error && (errorToast(), dispatch(clearError()));
    isUserDeleted && deleteUserToast();
  }, [error, isUserDeleted]);

  return (
    <div className='table-container'>
      <Popup
        title={`Are you sure wanna delete ${userEmail} ?`}
        deleteConfirmation={deleteConfirmation}
        onClose={() => setShowPopup(false)}
        showPopup={showPopup}
      />
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
            const { id, name, age, address, email } = user;
            return (
              <tr key={id}>
                <td data-label='Sr No.'>{idx + 1}</td>
                <td data-label='Name'>{name}</td>
                <td data-label='Email'>{email}</td>
                <td data-label='Age'>{age}</td>
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
