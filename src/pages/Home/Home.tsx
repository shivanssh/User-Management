import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TableView from '../../components/TableView/TableView';
import { fetchUsersRequested } from '../../redux/features/usersSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state: any) => state.users);
  console.log(users, '---suers');

  useEffect(() => {
    dispatch(fetchUsersRequested());
  }, [dispatch]);

  return (
    <div className='home'>
      <Link to='addUser'>
        <button>Add</button>
      </Link>
      {isLoading && <div>Loading...</div>}
      {users.length && !isLoading ? <TableView users={users} /> : null}
      {!users.length && !isLoading && <h1>{error}</h1>}
    </div>
  );
};

export default Home;
