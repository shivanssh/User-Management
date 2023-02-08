import React, { useState, useEffect } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import TableView from '../../components/TableView/TableView';
import { fetchUsersRequested } from '../../redux/features/usersSlice';
import CustomButton from './../../components/CustomButton/CustomButton';
import Loader from './../../components/Loader/Loader';
import { useAppSelector } from '../../hooks/dispatchSelection';
import { useAppDispatch } from './../../hooks/dispatchSelection';
import SearchBarContainer from '../../components/SearchBar/SearchBarContainer';
import PaginationContainer from '../../components/Pagination/PaginationContainer';

const Home = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.users);
  const { pageCount, pageLimit, searchQuery } = useAppSelector(
    (state) => state.pagination
  );

  useEffect(() => {
    dispatch(
      fetchUsersRequested({
        page: pageCount,
        limit: pageLimit,
        query: searchQuery,
      })
    );
  }, [dispatch, pageLimit, pageCount, searchQuery]);

  return (
    <div className='home'>
      <div className={`${users.length ? 'right' : ''} add-user-button`}>
        <Link to='addUser'>
          <CustomButton disabled={error || isLoading}>Add User</CustomButton>
        </Link>
      </div>
      <SearchBarContainer />
      {searchQuery && !users.length && 'No Record Found!'}

      {isLoading && <Loader />}

      {!isLoading && users.length ? <TableView users={users} /> : null}

      {!users.length && !isLoading && error && (
        <div className='error'>{error}</div>
      )}

      {!users.length && !isLoading && !error && !searchQuery && (
        <div className='heading'>Start adding users!</div>
      )}
      {users.length ? <PaginationContainer /> : null}
    </div>
  );
};

export default Home;
