import {createSlice, current} from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    value: 0,
    list: [],
    taskDetail: {},
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    removeAllTask: (state: any) => {
      state.list = [];
    },
    removeTaskItem: (state, action) => {
      const list = [...current(state).list];
      const newList = list.filter((i: any) => i.id !== action.payload);
      state.list = newList;
    },
    addTaskItem: (state: any, action) => {
      const newItem: any = action.payload;
      state.list.push(newItem);
    },
    getTaskDetail: (state: any, action) => {
      const list = [...current(state).list];
      const item = list.find((i: any) => i.id === action.payload);
      if (item?.id) {
        state.taskDetail = item;
      } else {
        state.taskDetail = {};
      }
    },
    updateTaskItem: (state: any, action) => {
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
  increment,
  decrement,
  incrementByAmount,
  addTaskItem,
  getTaskDetail,
  updateTaskItem,
  removeAllTask,
  removeTaskItem,
} = taskSlice.actions;
export const selectTask = (state: any) => state.task;

export default taskSlice.reducer;
