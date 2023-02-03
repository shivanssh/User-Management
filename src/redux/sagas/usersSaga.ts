import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery, call } from 'redux-saga/effects';
import { User } from '../../types';
import {
  setError,
  fetchUsersSucceeded,
  addUserSucceeded,
  deleteUserSucceeded,
  updateUser as editUser,
  fetchUsersRequested,
  addUserRequested,
  deleteUserRequested,
} from '../features/usersSlice';
import {
  addUserApi,
  deleteUserApi,
  fetchUsersApi,
  updateUserApi,
} from './../../apis/index';

function* fetchUsers(): any {
  try {
    const response = yield call(fetchUsersApi);
    yield put(fetchUsersSucceeded(response.data));
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* addUser(action: PayloadAction<User>): any {
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

export function* deleteUser(action: PayloadAction<number>): any {
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

export function* updateUser(action: PayloadAction<User>): any {
  const { payload: user } = action;
  try {
    yield call(updateUserApi, user);
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

function* usersSaga() {
  yield takeEvery(fetchUsersRequested.type, fetchUsers);
  yield takeEvery(addUserRequested.type, addUser);
  yield takeEvery(deleteUserRequested.type, deleteUser);
  yield takeEvery(editUser.type, updateUser);
}

export default usersSaga;
