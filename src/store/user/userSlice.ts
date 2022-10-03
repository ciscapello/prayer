import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInResponse, SignUpResponse } from './types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    isError: '',
    username: '',
    token: '',
    isLogin: false,
  },
  reducers: {
    signUpFetch: (state, action) => {
      console.log(action);
      state.isLoading = true;
    },
    singUpSuccess: (state, action: PayloadAction<SignUpResponse>) => {
      state.isLoading = false;
      state.isLogin = true;
      state.token = action.payload.token;
      state.username = action.payload.name;
    },
    signUpFailure: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = action.payload;
    },
    signInFetch: (state, action) => {
      console.log(action);
      state.isLoading = true;
    },
    singInSuccess: (state, action: PayloadAction<SignInResponse>) => {
      state.isLoading = false;
      state.isLogin = true;
      state.token = action.payload.token;
      state.username = action.payload.name;
    },
    signInFailure: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export const {
  signUpFetch,
  singUpSuccess,
  signUpFailure,
  signInFetch,
  singInSuccess,
  signInFailure,
} = userSlice.actions;

export default userSlice.reducer;
