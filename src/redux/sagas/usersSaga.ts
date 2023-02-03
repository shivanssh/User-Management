import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import { User } from '../../types';
import {
  setError,
  fetchUsersSucceeded,
  addUserSucceeded,
  deleteUserSucceeded,
  fetchUsersRequested,
  addUserRequested,
  deleteUserRequested,
  updateUserRequested,
  updateUserSucceeded,
} from '../features/usersSlice';
import {
  addUserApi,
  deleteUserApi,
  fetchUsersApi,
  updateUserApi,
} from './../../apis/index';

function* fetchUsers(): SagaIterator {
  try {
    const response = yield call(fetchUsersApi);
    yield put(fetchUsersSucceeded(response.data));
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* addUser(action: PayloadAction<User>): SagaIterator {
  const { payload: user } = action;
  try {
    const response: any = yield call(addUserApi, user);
    if (response.status === 201) {
      yield put(addUserSucceeded());
    }
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* deleteUser(action: PayloadAction<number>): SagaIterator {
  const { payload: userId } = action;
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield put(deleteUserSucceeded(userId));
    }
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* updateUser(action: PayloadAction<User>): SagaIterator {
  const { payload: user } = action;
  try {
    const resposnse = yield call(updateUserApi, user);
    if (resposnse.status === 200) {
      yield put(updateUserSucceeded(user));
    }
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

function* usersSaga() {
  yield takeEvery(fetchUsersRequested.type, fetchUsers);
  yield takeEvery(addUserRequested.type, addUser);
  yield takeEvery(deleteUserRequested.type, deleteUser);
  yield takeEvery(updateUserRequested.type, updateUser);
}

export default usersSaga;
