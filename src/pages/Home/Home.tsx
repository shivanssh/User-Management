import React, { useState, useEffect } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import TableView from '../../components/TableView/TableView';
import { fetchUsersRequested } from '../../redux/features/usersSlice';
import CustomButton from './../../components/CustomButton/CustomButton';
import Loader from './../../components/Loader/Loader';
import { useAppSelector } from '../../hooks/dispatchSelection';
import { useAppDispatch } from './../../hooks/dispatchSelection';
import { Paginate } from '../../types';
import Pagination from '../../components/Pagination/Pagination';

const Home = () => {
  const initialPageCounter: Paginate = {
    page: 1,
    limit: 5,
  };
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(initialPageCounter);
  const { users, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequested(counter));
  }, [dispatch, counter]);

  const handlePageLimitChange = (e: any) => {
    console.log(e.target.value);
    setCounter({ ...counter, limit: e.target.value });
  };

  const handlePageChange = (pageNumber: number) => {
    console.log(pageNumber);
    setCounter({ ...counter, page: pageNumber });
  };

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
      <Pagination
        handleLimitChange={handlePageLimitChange}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
