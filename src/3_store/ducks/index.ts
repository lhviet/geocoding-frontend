import { combineReducers, AnyAction } from 'redux';

import { StoreState } from '../../types';

import mapReducer from './map';
import markerReducer from './marker';

export default combineReducers<StoreState, AnyAction>({
  map: mapReducer,
  marker: markerReducer,
});
