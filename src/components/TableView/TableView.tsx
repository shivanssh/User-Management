import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUserRequested } from '../../redux/features/usersSlice';

const TableView = ({ users }: any) => {
  const dispatch = useDispatch();
  const handleDelete = (id: any) => {
    dispatch(deleteUserRequested(id));
    toast.success('User deleted successfully!');
  };
  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => {
            const { id, name, address, email } = user;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{address}</td>
                <td>
                  <div className='actionOptions'>
                    <Link to={`/updateUser/${id}`}>Edit</Link>{' '}
                    <button onClick={() => handleDelete(id)}>Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
