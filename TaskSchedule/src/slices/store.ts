import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from './userSlice';
import taskReducer from './taskSlice';
import categoryReducer from './categorySlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  // blacklist: ['counter'],
};
const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
  category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: [],
});
