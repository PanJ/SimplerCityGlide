/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectLine = () => (state) => state.get('line');

const selectLoading = () => createSelector(
  selectLine(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectLine(),
  (globalState) => globalState.get('error')
);

const selectMarkers = () => createSelector(
  selectLine(),
  (globalState) => globalState.get('markers')
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectValue = () => createSelector(
  selectLocationState(),
  (location) => {
    const path = location.locationBeforeTransitions.pathname;
    const match = path.match(/^\/line\/(\w*)-([12]?)$/);
    if (!match) {
      return {
        line: '',
        bound: '',
      };
    }
    const line = match[1];
    const bound = match[2];
    return { line, bound };
  }
);

export {
  selectLine,
  selectMarkers,
  selectLoading,
  selectError,
  selectLocationState,
  selectValue,
};
