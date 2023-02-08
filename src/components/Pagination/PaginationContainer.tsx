import React, { useEffect } from 'react';
import Pagination from './Pagination';
import {
  useAppSelector,
  useAppDispatch,
} from './../../hooks/dispatchSelection';
import {
  decrementPageCount,
  incrementPageCount,
  updatePageLimit,
} from '../../redux/features/paginationSlice';

const PaginationContainer = () => {
  const { pageCount, pageLimit } = useAppSelector((state) => state.pagination);

  useEffect(() => {}, [pageCount, pageLimit]);
  const dispatch = useAppDispatch();

  return (
    <Pagination
      disabled={pageCount === 1}
      handleLimitChange={(e) => dispatch(updatePageLimit(e.target.value))}
      nextButtonClicked={() => dispatch(incrementPageCount())}
      previousButtonClicked={() => dispatch(decrementPageCount())}
    />
  );
};

export default PaginationContainer;
