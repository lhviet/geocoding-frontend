import { combineEpics } from 'redux-observable';
import { epics as wordEpics } from '../ducks/word';

export const rootEpic = combineEpics(
  wordEpics,
);
