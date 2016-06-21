/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_DATA_SUCCESS,
  LOAD_DATA,
  LOAD_DATA_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  markers: fromJS([]),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('markers', []);
    case LOAD_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('markers', action.data);
    case LOAD_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('markers', []);
    default:
      return state;
  }
}

export default appReducer;
