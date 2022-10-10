import { call, put, retry, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import Api from '../../api';
import {
  createCommentsFailure,
  createCommentSuccess,
  deleteCommentFailure,
  deleteCommentSuccess,
  getAllComments,
  getAllCommentsFailure,
  getAllCommentsSuccess,
} from './commentsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

type DataType = {
  body: string;
  id: number;
};

const getAllCommentsApi = () => {
  const res = Api.get('comments');
  return res;
};

const createCommentApi = (data: DataType) => {
  const res = Api.post('comments', {
    body: data.body,
    created: new Date(),
    prayerId: data.id,
  });
  return res;
};

const deleteCommentApi = (data: number) => {
  const res = Api.delete(`comments/${data}`);
  return res;
};

function* deleteCommentWorker(action: PayloadAction<number>) {
  try {
    const response: AxiosResponse = yield call(
      deleteCommentApi,
      action.payload,
    );
    yield put(deleteCommentSuccess());
    yield put(getAllComments());
    return response;
  } catch (error) {
    yield put(deleteCommentFailure(error));
  }
}

function* getAllCommentsWorker() {
  try {
    const response: AxiosResponse = yield retry(5, 1000, getAllCommentsApi);
    yield put(getAllCommentsSuccess(response.data));
  } catch (error) {
    yield put(getAllCommentsFailure(error));
  }
}

function* createCommentWorker(
  action: PayloadAction<{ id: number; body: string }>,
) {
  try {
    const response: AxiosResponse = yield call(
      createCommentApi,
      action.payload,
    );
    yield put(createCommentSuccess());
    yield put(getAllComments());
    return response;
  } catch (error) {
    yield put(createCommentsFailure(error));
  }
}

export function* deleteCommentWatcher() {
  yield takeEvery('comments/deleteComment', deleteCommentWorker);
}

export function* createCommentWatcher() {
  yield takeEvery('comments/createComment', createCommentWorker);
}

export function* getAllCommentsWatcher() {
  yield takeEvery('comments/getAllComments', getAllCommentsWorker);
}
