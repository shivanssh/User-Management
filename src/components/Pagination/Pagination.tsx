import React from 'react';
import './Pagination.scss';

interface IProps {
  disabled: boolean;
  handleLimitChange: (e: any) => void;
  nextButtonClicked: () => void;
  previousButtonClicked: () => void;
}
const Pagination = ({
  disabled,
  handleLimitChange,
  nextButtonClicked,
  previousButtonClicked,
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
          onClick={() => previousButtonClicked()}
          disabled={disabled}
        >
          Previous
        </button>
        <button className='next-button' onClick={() => nextButtonClicked()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
