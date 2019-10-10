import { AnyAction, Reducer } from 'redux';
import { combineEpics } from 'redux-observable';


export interface WordState {
}

// ----- ACTIONS & EPICS ----- //

// ----- EPICs --------------------------------------------------------------------------------------------------------

export const epics = combineEpics(
);

// ----- REDUCER ------------------------------------------------------------------------------------------------------
const initialState: WordState = {
};
/**
 * Process only actions of WORD__
 */
const reducer: Reducer<WordState> = (state = initialState, action: AnyAction) => {
  // If this action is not belong to WORD, return the original state
  if (action.type.indexOf('WORD__') !== 0) {
    return state;
  }

  switch (action.type) {
    default:
      return state;
  }
};
export default reducer;
