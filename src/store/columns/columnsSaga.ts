import {call, put, takeEvery} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {
  createColumnFailure,
  createColumnSuccess,
  fetchColumns,
  fetchColumnsFailure,
  fetchColumnsSuccess,
} from './columnsSlice';
import Api from '../../api';
import {PayloadAction} from '@reduxjs/toolkit';
import {CreateColumnModalFormValues} from '../../components/createColumnModal/createColumnModal';

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
    const response: AxiosResponse = yield call(getAllColumnsApi);
    yield put(fetchColumnsSuccess(response.data));
  } catch (error) {
    yield put(fetchColumnsFailure(error));
  }
}

export function* createColumnsWatcher() {
  yield takeEvery('columns/createColumn', createColumnsWorker);
}

export function* getAllColumnsWatcher() {
  yield takeEvery('columns/fetchColumns', getAllColumnsWorker);
}
