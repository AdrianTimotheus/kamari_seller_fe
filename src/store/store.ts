import { configureStore } from '@reduxjs/toolkit';
import googleAuthSlice from './googleAuthSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    googleAuth: googleAuthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
