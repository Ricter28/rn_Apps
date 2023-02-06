import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    avatar: '',
    phone: '',
    joinAt: '',
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userName = action.payload.userName;
      state.avatar = action.payload.avatar;
      state.joinAt = action.payload.joinAt;
    },
    updateUserInfo: (state, action) => {
      state.userName = action.payload.userName;
      state.avatar = action.payload.avatar;
      state.phone = action.payload.phone;
    },
  },
});

export const {setUserInfo, updateUserInfo} = userSlice.actions;
export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
