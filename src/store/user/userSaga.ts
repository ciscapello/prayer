import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { SignUpFieldValues } from '../../components/signUp/signUp';
import { SignInFormValues } from '../../components/signIn/signIn';
import {
  signInFailure,
  signUpFailure,
  singInSuccess,
  singUpSuccess,
} from './userSlice';
import Api from '../../api';

const signUpApi = (data: SignUpFieldValues) => {
  const res = Api.post('auth/sign-up', data);
  return res;
};

const signInApi = (data: SignInFormValues) => {
  const res = Api.post('auth/sign-in', data);
  return res;
};

function* signUp(action: PayloadAction<SignUpFieldValues>) {
  try {
    const response: AxiosResponse = yield call(signUpApi, action.payload);
    yield put(singUpSuccess(response.data));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* signIn(action: PayloadAction<SignInFormValues>) {
  try {
    const response: AxiosResponse = yield call(signInApi, action.payload);
    yield put(singInSuccess(response.data));
    console.log('OK', response.data);
  } catch (error) {
    console.log('NEOK', error);
    yield put(signInFailure(error));
  }
}

export function* signUpWatcher() {
  yield takeEvery('user/signUpFetch', signUp);
}

export function* signInWatcher() {
  yield takeEvery('user/signInFetch', signIn);
}
