import { all, call } from 'redux-saga/effects';
import {
  createColumnsWatcher,
  deleteColumnWatcher,
  getAllColumnsWatcher,
} from './columns/columnsSaga';
import {
  checkPrayerWatcher,
  createPrayerWatcher,
  getAllPrayersWatcher,
} from './prayers/prayersSaga';
import { signInWatcher, signUpWatcher } from './user/userSaga';

function* rootSaga() {
  yield all([
    call(signUpWatcher),
    call(signInWatcher),
    call(getAllColumnsWatcher),
    call(createColumnsWatcher),
    call(getAllPrayersWatcher),
    call(checkPrayerWatcher),
    call(deleteColumnWatcher),
    call(createPrayerWatcher),
  ]);
  console.log('saga called');
}

export default rootSaga;
