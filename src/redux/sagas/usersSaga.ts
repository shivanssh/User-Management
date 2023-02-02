import { put, takeEvery, call } from 'redux-saga/effects';
import {
  setError,
  fetchUsersSucceeded,
  addUserSucceeded,
  deleteUserSucceeded,
  updateUser as editUser,
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

export function* addUser({ payload }: any): any {
  try {
    const response: any = yield call(addUserApi, payload);
    if (response.status === 201) {
      yield put(addUserSucceeded());
    }
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* deleteUser({ payload: id }: any): any {
  try {
    console.log(id, '---------id');
    const response = yield call(deleteUserApi, id);
    if (response.status === 200) {
      yield put(deleteUserSucceeded(id));
    }
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* updateUser({ payload }: any): any {
  try {
    console.log(payload, '-------c1');
    const response = yield call(updateUserApi, payload);
    console.log(response, '---rescheck');
    // if (response.status === 200) {
    //   yield put(editUser(payload));
    // }
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

function* usersSaga() {
  yield takeEvery('users/fetchUsersRequested', fetchUsers);
  yield takeEvery('users/addUserRequested', addUser);
  yield takeEvery('users/deleteUserRequested', deleteUser);
  yield takeEvery('users/updateUser', updateUser);
}

export default usersSaga;
