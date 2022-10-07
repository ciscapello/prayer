import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import Api from '../../api';
import {
  getAllComments,
  getAllCommentsFailure,
  getAllCommentsSuccess,
} from './commentsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

const getAllCommentsApi = () => {
  const res = Api.get('comments');
  return res;
};

type DataType = {
  body: string;
  id: number;
};

const createCommentApi = (data: DataType) => {
  const res = Api.post('comments', {
    body: data.body,
    created: new Date(),
    prayerId: data.id,
  });
  return res;
};

function* getAllCommentsWorker() {
  try {
    const response: AxiosResponse = yield call(getAllCommentsApi);
    yield put(getAllCommentsSuccess(response.data));
    yield console.log('saga success');
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
    yield put(getAllComments());
    yield console.log('success');
    return response;
  } catch (error) {
    yield put(createCommentFailure());
  }
}

export function* createCommentWatcher() {
  yield takeEvery('comments/createComment', createCommentWorker);
}

export function* getAllCommentsWatcher() {
  yield takeEvery('comments/getAllComments', getAllCommentsWorker);
}
function createCommentFailure(): any {
  throw new Error('Function not implemented.');
}
