import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import userSlice from './user/userSlice';
import rootSaga from './user/userSaga';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
