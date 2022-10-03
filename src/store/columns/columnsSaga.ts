import {call, put, takeEvery} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {fetchColumnsFailure, fetchColumnsSuccess} from './columnsSlice';
import Api from '../../api';

const getAllColumnsApi = () => {
  const res = Api.get('columns');
  return res;
};

function* getAllColumnsWorker() {
  try {
    const response: AxiosResponse = yield call(getAllColumnsApi);
    yield put(fetchColumnsSuccess(response.data));
  } catch (error) {
    yield put(fetchColumnsFailure(error));
  }
}

export function* getAllColumnsWatcher() {
  yield takeEvery('columns/fetchColumns', getAllColumnsWorker);
}
