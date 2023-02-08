import React from 'react';
import './SearchBar.scss';

interface IProps {
  handleChange: (e: any) => void;
}

const SearchBar = ({ handleChange }: IProps) => {
  return (
    <div className='search-bar'>
      <input
        type='text'
        name='search-bar'
        placeholder='search..'
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default SearchBar;
