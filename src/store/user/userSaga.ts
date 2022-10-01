import {all, call, put, takeEvery} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';
import {PayloadAction} from '@reduxjs/toolkit';
import {SignUpFieldValues} from '../../components/signUp/signUp';
import {SignInFormValues} from '../../components/signIn/signIn';
import {
  signInFailure,
  signUpFailure,
  singInSuccess,
  singUpSuccess,
} from './userSlice';

const BASE_URL = 'https://prayer.herokuapp.com';

const signUpApi = (data: SignUpFieldValues) => {
  const res = axios.post(`${BASE_URL}/auth/sign-up`, data);
  return res;
};

const signInApi = (data: SignInFormValues) => {
  const res = axios.post(`${BASE_URL}/auth/sign-in`, data);
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

function* signUpWatcher() {
  yield takeEvery('user/signUpFetch', signUp);
}

function* signInWatcher() {
  yield takeEvery('user/signInFetch', signIn);
}

function* rootSaga() {
  yield all([call(signUpWatcher), call(signInWatcher)]);
  console.log('saga called');
}

export default rootSaga;
