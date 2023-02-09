import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageInfo } from '../../types';

const initialState: PageInfo = {
  currentPage: 0,
  pageLimit: '5',
  searchQuery: '',
  totalPageCount: 1,
  sortConfig: {
    key: '',
    direction: '',
  },
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    incrementPageCount: (state) => {
      ++state.currentPage;
    },
    decrementPageCount: (state) => {
      --state.currentPage;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updatePageLimit: (state, action: PayloadAction<string>) => {
      state.pageLimit = action.payload;
      state.currentPage = 1;
    },
    updateSearchquery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setTotalCount: (state, action) => {
      state.totalPageCount = action.payload;
    },
    setSortConfig: (state, action) => {
      state.sortConfig.direction = action.payload.direction;
      state.sortConfig.key = action.payload.key;
      state.currentPage = 1;
    },
  },
});

export const {
  incrementPageCount,
  decrementPageCount,
  setCurrentPage,
  updatePageLimit,
  updateSearchquery,
  setTotalCount,
  setSortConfig,
} = paginationSlice.actions;
export default paginationSlice.reducer;
