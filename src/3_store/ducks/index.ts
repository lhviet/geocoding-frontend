import { combineReducers, AnyAction } from 'redux';

import {StoreState} from '^/types';

import wordReducer from './word';

export default combineReducers<StoreState, AnyAction>({
  word: wordReducer,
});
