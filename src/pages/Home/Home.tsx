import React, { useEffect } from 'react';
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
  const { users, isLoading, error, isUserDeleted } = useAppSelector(
    (state) => state.users
  );
  const { currentPage, pageLimit, searchQuery, sortConfig } = useAppSelector(
    (state) => state.pagination
  );

  const fetchUsersPayload = { currentPage, pageLimit, searchQuery, sortConfig };

  useEffect(() => {
    dispatch(fetchUsersRequested(fetchUsersPayload));
  }, [
    dispatch,
    pageLimit,
    currentPage,
    searchQuery,
    sortConfig,
    isUserDeleted,
  ]);

  return (
    <div className='home'>
      <div className={`${users.length ? 'right' : ''} add-user-button`}>
        <Link to='addUser'>
          <CustomButton disabled={error || isLoading}>Add User</CustomButton>
        </Link>
      </div>

      {!error && <SearchBarContainer />}

      {isLoading && <Loader />}

      {!isLoading && users.length ? <TableView users={users} /> : null}

      {users.length ? <PaginationContainer /> : null}

      {!users.length && !isLoading && error && (
        <div className='error'>{error}</div>
      )}

      {searchQuery && !users.length && 'No Record Found!'}

      {!users.length && !isLoading && !error && !searchQuery && (
        <div className='heading'>Start adding users!</div>
      )}
    </div>
  );
};

export default Home;
