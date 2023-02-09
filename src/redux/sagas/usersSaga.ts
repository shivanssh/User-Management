import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { PageInfo, User } from '../../types';
import { setTotalCount } from '../features/paginationSlice';
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
import * as userServices from './../services/userService';

function* fetchUsers(action: PayloadAction<PageInfo>): any {
  const { payload } = action;

  try {
    const response = yield userServices.fetchUsers(payload);
    if (response.status === 200) {
      yield put(fetchUsersSucceeded(response.data));
      yield put(setTotalCount(+response.headers['x-total-count']));
    }
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* addUser(action: PayloadAction<User>): any {
  const { payload: user } = action;
  try {
    const response = yield userServices.addUser(user);
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
    const response = yield userServices.deleteUser(userId);
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
    const resposnse = yield userServices.updateUser(user);
    if (resposnse.status === 200) {
      yield put(updateUserSucceeded());
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
