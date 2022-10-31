import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface GoogleAuth {
  value: {
    email: string,
    name: string,
  }
}

const initialState: GoogleAuth = {
  value: {
    email: '',
    name: '',
  },
};

const googleAuthSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    setGoogleAuth(state, action) {
      state.value = action.payload;
    },
  },
});

export const googleAuthActions = googleAuthSlice.actions;

export const selectGoogleAuth = (state: RootState) => state.googleAuth.value;

export default googleAuthSlice;
