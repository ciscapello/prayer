import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getAllPrayersFailure, getAllPrayersSuccess } from './prayersSlice';
import Api from '../../api';

const getAllPrayersApi = () => {
  const res = Api.get('prayers');
  return res;
};

function* getAllPrayersWorker() {
  try {
    const response: AxiosResponse = yield call(getAllPrayersApi);
    yield put(getAllPrayersSuccess(response.data));
  } catch (error) {
    yield put(getAllPrayersFailure(error));
  }
}

export function* getAllPrayersWatcher() {
  yield takeEvery('prayers/getAllPrayers', getAllPrayersWorker);
}
