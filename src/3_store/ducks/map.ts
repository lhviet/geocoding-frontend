import { AnyAction, Reducer } from 'redux';
import { combineEpics } from 'redux-observable';

import { MapState } from '../../types';

// ----- ACTIONS & EPICS ----- //

export const MAP__GEO_CODING = 'MAP__GEO_CODING';
export const actionGeoCoding = (keywords: string): AnyAction => ({
  type: MAP__GEO_CODING,
  data: keywords,
});

// ----- EPICs --------------------------------------------------------------------------------------------------------

export const epics = combineEpics(
);

// ----- REDUCER ------------------------------------------------------------------------------------------------------
const initialState: MapState = {
};
/**
 * Process only actions of MAP__
 */
const reducer: Reducer<MapState> = (state = initialState, action: AnyAction) => {
  // If this action is not belong to MARKER, return the original state
  if (action.type.indexOf('MAP__') !== 0) {
    return state;
  }

  switch (action.type) {
    case `${MAP__GEO_CODING}`:
      return state;
    default:
      return state;
  }
};
export default reducer;
