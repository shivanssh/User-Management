import React from 'react';
import './Home.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TableView from '../../components/TableView/TableView';
import { fetchUsersRequested } from '../../redux/features/usersSlice';
import CustomButton from './../../components/CustomButton/CustomButton';
import Loader from './../../components/Loader/Loader';
import TextError from './../../components/TextError/TextError';
import { useAppSelector } from '../../hooks/dispatchSelection';
import { useAppDispatch } from './../../hooks/dispatchSelection';

const Home = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequested());
  }, [dispatch]);

  return (
    <div className='home'>
      <Link to='addUser'>
        <CustomButton>Add User</CustomButton>
      </Link>

      {isLoading && <Loader />}
      {users.length && !isLoading ? <TableView users={users} /> : null}
      {!users.length && !isLoading && <div className='error'>{error}</div>}
    </div>
  );
};

export default Home;
