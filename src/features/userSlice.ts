import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface User {
  value: {
    id: number,
    email: string,
    username: string,
    name: string,
    roleId: number,
    picUrl: string,
  }
}

const initialState: User = {
  value: {
    id: 0,
    email: '',
    username: '',
    name: '',
    roleId: 0,
    picUrl: '',
  },
};

const userSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    setUser(state, action) {
      state.value = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice;
