import { combineEpics } from 'redux-observable';
import { epics as markerEpics } from '../ducks/marker';
import { epics as mapEpics } from '../ducks/map';

export const rootEpic = combineEpics(
  markerEpics,
  mapEpics,
);
