import {createSlice, current} from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    categoryDetail: {},
  },
  reducers: {
    // increment: state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },
    removeAllCategory: (state: any) => {
      state.list = [];
    },
    removeCategoryItem: (state, action) => {
      const list = [...current(state).list];
      const newList = list.filter((i: any) => i.id !== action.payload);
      state.list = newList;
    },
    addCategoryItem: (state: any, action) => {
      const newItem: any = action.payload;
      state.list.push(newItem);
    },
    getCategoryDetail: (state: any, action) => {
      const list = [...current(state).list];
      const item = list.find((i: any) => i.id === action.payload);
      if (item?.id) {
        state.categoryDetail = item;
      } else {
        state.categoryDetail = {};
      }
    },
    updateCategoryItem: (state: any, action) => {
      const temp = [...current(state).list];
      const indexItem = temp.findIndex((i: any) => i.id === action.payload.id);
      if (indexItem !== -1) {
        temp[indexItem] = action.payload.data;
        state.list = temp;
      }
    },
  },
});

export const {
  addCategoryItem,
  getCategoryDetail,
  updateCategoryItem,
  removeAllCategory,
  removeCategoryItem,
} = categorySlice.actions;
export const selectCategory = (state: any) => state.category;

export default categorySlice.reducer;
