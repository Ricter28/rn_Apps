import {createSlice, current, createAsyncThunk} from '@reduxjs/toolkit';

import {getNews} from 'services/appService';
import {GetNewParams} from 'interface';

export const getNewsList = createAsyncThunk(
  'new/fetchList',
  async ({country, category, page, pageSize}: GetNewParams) => {
    const response = await getNews(country, category, page, pageSize);
    return response;
  },
);
export const getMoreNewsList = createAsyncThunk(
  'new/fetchMoreList',
  async ({country, category, page, pageSize}: GetNewParams) => {
    const response = await getNews(country, category, page, pageSize);
    return response;
  },
);

export const newSlice = createSlice({
  name: 'new',
  initialState: {
    list: [],
    meta: {
      page: 1,
      pageSize: 10,
      category: '',
      country: '',
    },
    totalList: 0,
    newDetail: {},
    loading: false,
  },
  reducers: {
    getDetailNew: (state: any, action) => {
      state.newDetail = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getNewsList.pending, state => {
        state.loading = true;
      })
      .addCase(getNewsList.fulfilled, (state: any, action) => {
        state.loading = false;
        state.list = action.payload.articles;
        state.meta = action.meta.arg;
        state.totalList = action.payload.totalResults;
      })
      .addCase(getNewsList.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMoreNewsList.pending, state => {
        state.loading = true;
      })
      .addCase(getMoreNewsList.fulfilled, (state: any, action) => {
        state.loading = false;
        const newList = [...current(state).list, ...action.payload.articles];
        state.list = newList;
        state.meta = action.meta.arg;
        state.totalList = action.payload.totalResults;
      })
      .addCase(getMoreNewsList.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {getDetailNew} = newSlice.actions;
export const selectNew = (state: any) => state.newReducer;

export default newSlice.reducer;
