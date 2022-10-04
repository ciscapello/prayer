import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import userSlice from './user/userSlice';
import rootSaga from './rootSaga';
import columnsSlice from './columns/columnsSlice';
import prayersSlice from './prayers/prayersSlice';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userSlice,
    columns: columnsSlice,
    prayers: prayersSlice,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
