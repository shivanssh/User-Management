import { configureStore } from '@reduxjs/toolkit';
import users from './features/usersSlice';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import usersSaga from './sagas/usersSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: {
    users,
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
