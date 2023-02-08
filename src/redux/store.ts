import { configureStore } from '@reduxjs/toolkit';
import users from './features/usersSlice';
import paginationSlice from './features/paginationSlice';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import usersSaga from './sagas/usersSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

const store = configureStore({
  reducer: {
    users,
    pagination: paginationSlice,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    ...middlewares,
  ],
});

sagaMiddleware.run(usersSaga);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
