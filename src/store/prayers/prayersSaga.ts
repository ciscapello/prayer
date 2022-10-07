import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  createPrayerFailure,
  createPrayerSuccess,
  getAllPrayers,
  getAllPrayersFailure,
  getAllPrayersSuccess,
  toggleCheckedPrayerFailure,
} from './prayersSlice';
import Api from '../../api';
import { Prayer } from '../../types/index';
import { PayloadAction } from '@reduxjs/toolkit';

const getAllPrayersApi = () => {
  const res = Api.get('prayers');
  console.log(res);
  return res;
};

const checkPrayerApi = (prayer: Prayer) => {
  console.log(prayer);
  const res = Api.put(`prayers/${prayer.id}`, {
    title: prayer.title,
    description: prayer.description,
    checked: !prayer.checked,
    columnId: prayer.columnId,
  });
  return res;
};

const createPrayerApi = (data: { title: string; id: number }) => {
  const res = Api.post('prayers', {
    title: data.title,
    description: '',
    checked: false,
    columnId: data.id,
  });
  return res;
};

function* createPrayerWorker(
  action: PayloadAction<{ title: string; id: number }>,
) {
  try {
    const response: AxiosResponse = yield call(createPrayerApi, action.payload);
    yield put(createPrayerSuccess());
    yield put(getAllPrayers());
    return response;
  } catch (error) {
    yield put(createPrayerFailure(error));
  }
}

function* checkPrayerWorker(action: PayloadAction<Prayer>) {
  try {
    const response: AxiosResponse = yield call(checkPrayerApi, action.payload);
    return response;
  } catch (error) {
    yield put(toggleCheckedPrayerFailure(error));
  }
}

function* getAllPrayersWorker() {
  try {
    const response: AxiosResponse = yield call(getAllPrayersApi);
    yield put(getAllPrayersSuccess(response.data));
  } catch (error) {
    yield put(getAllPrayersFailure(error));
  }
}

export function* createPrayerWatcher() {
  yield takeEvery('prayers/createPrayer', createPrayerWorker);
}

export function* checkPrayerWatcher() {
  yield takeLeading('prayers/toggleCheckedPrayer', checkPrayerWorker);
}

export function* getAllPrayersWatcher() {
  yield takeEvery('prayers/getAllPrayers', getAllPrayersWorker);
}
