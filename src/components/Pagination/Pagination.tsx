import React, { useRef } from 'react';
import './Pagination.scss';

interface IProps {
  handleLimitChange: (e: any) => void;
  handlePageChange: (e: any) => void;
}
const Pagination = ({ handleLimitChange, handlePageChange }: IProps) => {
  const pageNumber = useRef(1);
  return (
    <div className='pagination'>
      <div className='page-limit'>
        <div className='limit-title'>Items/Page</div>
        <select
          className='page-limit-selection'
          name='pageLimit'
          id='pageLimit'
          defaultValue={5}
          onChange={(e: any) => handleLimitChange(e)}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
        </select>
      </div>
      <div className='next-previous-button'>
        <button
          className='previous-button'
          onClick={() =>
            handlePageChange(pageNumber.current <= 1 ? 1 : --pageNumber.current)
          }
        >
          Previous
        </button>
        <button
          className='next-button'
          onClick={() => handlePageChange(++pageNumber.current)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
