/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_DATA } from './constants';
import { dataLoaded, dataLoadingError } from './actions';

import request from 'utils/request';
import { selectValue } from 'containers/LinePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getData() {
  // Select username from store
  const value = yield select(selectValue());
  if (!value) {
    return;
  }
  const requestURL = 'http://cityglide.com/migrate_gps';

  // Call our request helper (see 'utils/request')
  const data = yield call(request, requestURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `MODE=get_gps&bus_lines=${value.line}&bound=${value.bound}`,
  });

  if (!data.err) {
    yield put(dataLoaded(data.data));
  } else {
    yield put(dataLoadingError(data.err));
  }
}

/**
 * Watches for LOAD_DATA action and calls handler
 */
export function* getDataWatcher() {
  while (yield take(LOAD_DATA)) {
    yield call(getData);
  }
}
export function* getReloadWatcher() {
  yield take(LOCATION_CHANGE);
  yield call(getData);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* busData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getDataWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* reload() {
  // Fork watcher so we can continue execution
  yield fork(getReloadWatcher);
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

// Bootstrap sagas
export default [
  busData,
  reload,
];
