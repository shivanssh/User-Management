import React, { useEffect } from 'react';
import Pagination from './Pagination';
import {
  useAppSelector,
  useAppDispatch,
} from './../../hooks/dispatchSelection';
import {
  decrementPageCount,
  incrementPageCount,
  setCurrentPage,
  updatePageLimit,
} from '../../redux/features/paginationSlice';

const PaginationContainer = () => {
  const dispatch = useAppDispatch();
  const { currentPage, pageLimit, totalPageCount } = useAppSelector(
    (state) => state.pagination
  );

  useEffect(() => {}, [currentPage, pageLimit, totalPageCount]);

  const totalPage = Math.ceil(totalPageCount / +pageLimit);

  return (
    <Pagination
      currentPage={currentPage}
      totalPageCount={totalPage}
      handleLimitChange={(e) => dispatch(updatePageLimit(e.target.value))}
      onNext={() => dispatch(incrementPageCount())}
      onPrevious={() => dispatch(decrementPageCount())}
      pageClick={(idx) => dispatch(setCurrentPage(idx))}
    />
  );
};

export default PaginationContainer;
