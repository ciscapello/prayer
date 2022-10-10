import { call, put, retry, select, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  createColumnFailure,
  createColumnSuccess,
  deleteColumnFailure,
  deleteColumnSuccess,
  fetchColumns,
  fetchColumnsFailure,
  fetchColumnsSuccess,
} from './columnsSlice';
import Api from '../../api';
import { PayloadAction } from '@reduxjs/toolkit';
import { CreateColumnModalFormValues } from '../../components/createColumnModal/createColumnModal';
import { selectColumnId } from './selectors';

const getAllColumnsApi = () => {
  const res = Api.get('columns');
  return res;
};

const createColumnApi = (data: CreateColumnModalFormValues) => {
  const body = {
    title: data.title,
    description: '',
    prayerId: 0,
  };
  const res = Api.post('columns', body);
  return res;
};

const deleteColumnApi = (data: number) => {
  const res = Api.delete(`columns/${data}`);
  return res;
};

function* deleteColumnWorker() {
  const id: number = yield select(selectColumnId);
  try {
    const response: AxiosResponse = yield call(deleteColumnApi, id);
    yield put(deleteColumnSuccess());
    yield put(fetchColumns());
    return response;
  } catch (error) {
    yield put(deleteColumnFailure());
  }
}

function* createColumnsWorker(
  action: PayloadAction<CreateColumnModalFormValues>,
) {
  try {
    const response: AxiosResponse = yield call(createColumnApi, action.payload);
    yield put(createColumnSuccess());
    yield put(fetchColumns());
    return response;
  } catch (error) {
    yield put(createColumnFailure(error));
  }
}

function* getAllColumnsWorker() {
  try {
    const response: AxiosResponse = yield retry(5, 1000, getAllColumnsApi);
    yield put(fetchColumnsSuccess(response.data));
  } catch (error) {
    yield put(fetchColumnsFailure(error));
  }
}

export function* deleteColumnWatcher() {
  yield takeEvery('columns/deleteColumn', deleteColumnWorker);
}

export function* createColumnsWatcher() {
  yield takeEvery('columns/createColumn', createColumnsWorker);
}

export function* getAllColumnsWatcher() {
  yield takeEvery('columns/fetchColumns', getAllColumnsWorker);
}
