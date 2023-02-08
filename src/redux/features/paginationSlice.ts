import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageInfo } from '../../types';

const initialState: PageInfo = {
  pageCount: 1,
  pageLimit: '5',
  searchQuery: '',
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    incrementPageCount: (state) => {
      ++state.pageCount;
    },
    decrementPageCount: (state) => {
      --state.pageCount;
    },
    updatePageLimit: (state, action: PayloadAction<string>) => {
      state.pageLimit = action.payload;
    },
    updateSearchquery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.pageCount = 1;
    },
  },
});

export const {
  incrementPageCount,
  decrementPageCount,
  updatePageLimit,
  updateSearchquery,
} = paginationSlice.actions;
export default paginationSlice.reducer;
