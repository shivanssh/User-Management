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
      <div className={`${users.length ? 'right' : ''} add-user-button`}>
        <Link to='addUser'>
          <CustomButton disabled={error || isLoading}>Add User</CustomButton>
        </Link>
      </div>

      {isLoading && <Loader />}

      {!isLoading && users.length ? <TableView users={users} /> : null}

      {!users.length && !isLoading && error && (
        <div className='error'>{error}</div>
      )}

      {!users.length && !isLoading && !error && (
        <div className='heading'>Start adding users!</div>
      )}
    </div>
  );
};

export default Home;
