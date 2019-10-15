import { AnyAction, Reducer } from 'redux';
import { ActionsObservable, combineEpics, ofType } from 'redux-observable';
import { catchError, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';
import * as _ from 'lodash-es';

import * as T from '../../types';

import { makeDone, makeFailed, makeStart } from '../../4_services/action-service';
import { headerJson } from '../../4_services/http-service';

import { getAPIUrl, HOST } from '../../5_constants/api';

export const APIToMarker: (rawData: any) => T.Marker = rawData => ({
  id: rawData.id,
  title: rawData.title,
  lng: rawData.lng,
  lat: rawData.lat,
  desc: rawData.desc,
  created_at: new Date(rawData.created_at),
  updated_at: new Date(rawData.updated_at),
});

// ----- ACTIONS & EPICS ----- //
export const GET_MARKERS = 'MARKER__GET_MARKERS';
export const getMarkers = (): AnyAction => makeStart(GET_MARKERS);

export const DELETE_MARKER = 'MARKER__DELETE_MARKER';
export const deleteMarker = (id: number): AnyAction => makeStart(DELETE_MARKER, id);

// ----- EPICs --------------------------------------------------------------------------------------------------------
const epicGetMarkers = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${GET_MARKERS}_START`),
  switchMap(() => ajax.get(
    getAPIUrl(HOST.api.markers),
    headerJson,
  ).pipe(
    map(({response}) => response.map(APIToMarker)),
    mergeMap((data) => [makeDone(GET_MARKERS, data)]),
    catchError((ajaxError: AjaxError) => [makeFailed(GET_MARKERS, ajaxError)]),
  )),
);

const epicDeleteMarkers = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${DELETE_MARKER}_START`),
  mergeMap(({ data: id }) => ajax.delete(getAPIUrl(HOST.api.markers, id))
    .pipe(
      mapTo(makeDone(DELETE_MARKER, id)),
      catchError((ajaxError: AjaxError) => [makeFailed(DELETE_MARKER, ajaxError)]),
    )),
);

export const epics = combineEpics(
  epicGetMarkers,
  epicDeleteMarkers,
);

// ----- REDUCER ------------------------------------------------------------------------------------------------------
const initialState: T.MarkerState = {
  markers: [],
  isGettingMarkers: false,
  isDeletingMarkers: false,
};
/**
 * Process only actions of MARKER__
 */
const reducer: Reducer<T.MarkerState> = (state = initialState, action: AnyAction) => {
  // If this action is not belong to MARKER, return the original state
  if (action.type.indexOf('MARKER__') !== 0) {
    return state;
  }

  console.log('action = ', action);

  switch (action.type) {
    case `${GET_MARKERS}_START`:
      return {...state, isGettingMarkers: true};
    case `${GET_MARKERS}_DONE`:
      return {
        ...state,
        markers: action.data,
        isGettingMarkers: false,
      };
    case `${GET_MARKERS}_FAILED`:
      return {...state, isGettingMarkers: false};

    case `${DELETE_MARKER}_START`:
      return {...state, isDeletingMarkers: true};
    case `${DELETE_MARKER}_DONE`:
      return {
        ...state,
        markers: _.filter(state.markers, { id: action.data }),
        isDeletingMarkers: false,
      };
    case `${DELETE_MARKER}_FAILED`:
      return {...state, isDeletingMarkers: false};

    default:
      return state;
  }
};
export default reducer;
