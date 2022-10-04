import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  getAllPrayersFailure,
  getAllPrayersSuccess,
  toggleCheckedPrayerFailure,
} from './prayersSlice';
import Api from '../../api';
import { Prayer } from '../../types/index';
import { PayloadAction } from '@reduxjs/toolkit';

const getAllPrayersApi = () => {
  const res = Api.get('prayers');
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

export function* checkPrayerWatcher() {
  yield takeLeading('prayers/toggleCheckedPrayer', checkPrayerWorker);
}

export function* getAllPrayersWatcher() {
  yield takeEvery('prayers/getAllPrayers', getAllPrayersWorker);
}
