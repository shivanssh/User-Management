import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import useDebounce from './../../hooks/useDebounce';
import { useAppDispatch } from './../../hooks/dispatchSelection';
import { updateSearchquery } from '../../redux/features/paginationSlice';

const SearchBarContainer = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 1000);

  useEffect(() => {
    dispatch(updateSearchquery(debouncedQuery));
  }, [dispatch, debouncedQuery]);

  const handleSearchQuery = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return <SearchBar handleChange={handleSearchQuery} />;
};

export default SearchBarContainer;
