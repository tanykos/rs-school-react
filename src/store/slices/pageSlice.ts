import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PageState {
  currentPage: number;
}

const getCurrentPageFromUrl = (): number => {
  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get('page');
  return page ? parseInt(page, 10) : 1;
};

const initialState: PageState = {
  currentPage: getCurrentPageFromUrl(),
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
