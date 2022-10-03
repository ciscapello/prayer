import {all, call} from 'redux-saga/effects';
import {
  createColumnsWatcher,
  getAllColumnsWatcher,
} from './columns/columnsSaga';
import {signInWatcher, signUpWatcher} from './user/userSaga';

function* rootSaga() {
  yield all([
    call(signUpWatcher),
    call(signInWatcher),
    call(getAllColumnsWatcher),
    call(createColumnsWatcher),
  ]);
  console.log('saga called');
}

export default rootSaga;
