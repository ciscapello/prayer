import { all, call } from 'redux-saga/effects';
import {
  createColumnsWatcher,
  getAllColumnsWatcher,
} from './columns/columnsSaga';
import {
  checkPrayerWatcher,
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
  ]);
  console.log('saga called');
}

export default rootSaga;
