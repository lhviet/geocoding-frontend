import { combineEpics } from 'redux-observable';
import { epics as markerEpics } from '../ducks/marker';

export const rootEpic = combineEpics(
  markerEpics,
);
