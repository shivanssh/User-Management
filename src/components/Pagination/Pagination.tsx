import React from 'react';
import './Pagination.scss';

interface IProps {
  currentPage: number;
  totalPageCount: number;
  handleLimitChange: (e: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  pageClick: (idx: number) => void;
}

const Pagination = ({
  currentPage,
  totalPageCount,
  handleLimitChange,
  onNext,
  onPrevious,
  pageClick,
}: IProps) => {
  return (
    <div className='pagination'>
      <div className='page-limit'>
        <div className='limit-title'>Items/Page</div>
        <select
          className='page-limit-selection'
          name='pageLimit'
          id='pageLimit'
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
          onClick={() => onPrevious()}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        <div className='page-numbers'>
          {[...new Array(totalPageCount)].map((_, idx) => (
            <button
              key={idx}
              className={++idx === currentPage ? 'active' : ''}
              onClick={() => pageClick(idx)}
            >
              {idx}
            </button>
          ))}
        </div>
        <button
          className='next-button'
          onClick={() => onNext()}
          disabled={currentPage === totalPageCount || !totalPageCount}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
