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
import { setSortConfig } from '../../redux/features/paginationSlice';
import { DATA_LABELS } from '../../utils/constants';

interface IProps {
  users: User[];
}

const TableView = ({ users }: IProps) => {
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const [userEmail, setUserEmail] = useState('');
  const { error, isUserDeleted } = useAppSelector((state) => state.users);
  const { sortConfig } = useAppSelector((state) => state.pagination);

  useEffect(() => {}, [deleteId, showPopup, sortConfig]);

  const deleteConfirmation = (isConfirmed: boolean) => {
    if (isConfirmed) {
      dispatch(deleteUserRequested(Number(deleteId)));
    }
    setShowPopup(false);
  };

  const handleDelete = (id: number) => {
    setShowPopup(true);
    setDeleteId(String(id));
    const user = users.find((user) => user.id === id);
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

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    dispatch(setSortConfig({ key, direction }));
  };

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
            {DATA_LABELS.map(({ id, title }) => (
              <th
                key={id}
                onClick={() => handleSort(id)}
                className='table-header'
              >
                <span className='title'>{title}</span>
                {sortConfig?.key === id && sortConfig?.direction === 'asc' && (
                  <span className='sort-order'>&or;</span>
                )}
                {sortConfig?.key === id && sortConfig?.direction === 'desc' && (
                  <span className='sort-order'>&and;</span>
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => {
            const { id } = user;
            return (
              <tr key={id}>
                {DATA_LABELS.map(({ id }) => (
                  <td key={id} data-label={id}>
                    {user[id]}
                  </td>
                ))}
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
