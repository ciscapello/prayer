import {all, call} from 'redux-saga/effects';
import {getAllColumnsWatcher} from './columns/columnsSaga';
import {signInWatcher, signUpWatcher} from './user/userSaga';

function* rootSaga() {
  yield all([
    call(signUpWatcher),
    call(signInWatcher),
    call(getAllColumnsWatcher),
  ]);
  console.log('saga called');
}

export default rootSaga;
