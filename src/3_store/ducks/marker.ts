import { AnyAction, Reducer } from 'redux';
import { ActionsObservable, combineEpics, ofType } from 'redux-observable';
import { catchError, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';
import _ from 'lodash-es';

import * as T from '../../types';
import { APIStatus } from '../../types';

import { makeDone, makeFailed, makeStart } from '../../4_services/action-service';
import { headerJson } from '../../4_services/http-service';

import { getAPIUrl, HOST } from '../../5_constants/api';

export const APIToMarker: (rawData: any) => T.Marker = rawData => ({
  id: rawData.id,
  title: rawData.title,
  lng: rawData.lng,
  lat: rawData.lat,
  desc: rawData.desc,
  created_at: rawData.created_at ? new Date(rawData.created_at) : undefined,
  updated_at: rawData.updated_at ? new Date(rawData.updated_at) : undefined,
});

// ----- ACTIONS & EPICS ----- //
export const GET_MARKERS = 'MARKER__GET_MARKERS';
export const getMarkers = (): AnyAction => makeStart(GET_MARKERS);

export const DELETE_MARKER = 'MARKER__DELETE_MARKER';
export const deleteMarker = (id: number): AnyAction => makeStart(DELETE_MARKER, id);

export const SAVE_MARKER = 'MARKER__SAVE_MARKER';
export const saveMarker = (marker: T.Marker): AnyAction => makeStart(SAVE_MARKER, marker);

export const UPDATE_MARKER = 'MARKER__UPDATE_MARKER';
export const updateMarker = (marker: T.Marker): AnyAction => makeStart(UPDATE_MARKER, marker);

// ----- EPICs --------------------------------------------------------------------------------------------------------
const markerURL: string = getAPIUrl(HOST.api.markers);

const epicGetMarkers = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${GET_MARKERS}_START`),
  switchMap(() => ajax.get(markerURL, headerJson)
    .pipe(
      map(({response}) => response.map(APIToMarker)),
      mergeMap((data) => [
        makeDone(GET_MARKERS, data),
      ]),
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

const epicSaveMarker = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${SAVE_MARKER}_START`),
  mergeMap(({ data: marker }) => {
    return ajax.post(markerURL, marker, headerJson)
      .pipe(
        map(({ response }) => response),
        map(APIToMarker),
        mergeMap((data) => [
          makeDone(SAVE_MARKER, data),
          getMarkers(),
        ]),
        catchError((ajaxError: AjaxError) => [
          makeFailed(SAVE_MARKER, ajaxError),
          getMarkers(),
        ]),
      )
  }),
);

const epicUpdateMarker = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${UPDATE_MARKER}_START`),
  mergeMap(({ data: marker }) => {
    return ajax.patch(getAPIUrl(HOST.api.markers, marker.id), marker, headerJson)
      .pipe(
        map(({ response }) => response),
        map(APIToMarker),
        mergeMap((data) => [
          makeDone(UPDATE_MARKER, data),
        ]),
        catchError((ajaxError: AjaxError) => [
          makeFailed(UPDATE_MARKER, ajaxError),
        ]),
      )
  }),
);

export const epics = combineEpics(
  epicGetMarkers,
  epicDeleteMarkers,
  epicSaveMarker,
  epicUpdateMarker,
);

// ----- REDUCER ------------------------------------------------------------------------------------------------------
const initialState: T.MarkerState = {
  markers: [],
  processingMarkerId: -1,
  getMarkersStatus: APIStatus.IDLE,
  deleteMarkerStatus: APIStatus.IDLE,
  saveMarkerStatus: APIStatus.IDLE,
  updateMarkerStatus: APIStatus.IDLE,
};
/**
 * Process only actions of MARKER__
 */
const reducer: Reducer<T.MarkerState> = (state = initialState, action: AnyAction) => {
  // If this action is not belong to MARKER, return the original state
  if (action.type.indexOf('MARKER__') !== 0) {
    return state;
  }

  switch (action.type) {
    case `${GET_MARKERS}_START`:
      return { ...state, isGettingMarkers: APIStatus.PROCESSING };
    case `${GET_MARKERS}_DONE`:
      return {
        ...state,
        markers: action.data,
        isGettingMarkers: APIStatus.DONE,
      };
    case `${GET_MARKERS}_FAILED`:
      return { ...state, isGettingMarkers: APIStatus.FAILED };

    case `${DELETE_MARKER}_START`:
      return {
        ...state,
        processingMarkerId: action.data,
        deleteMarkerStatus: APIStatus.PROCESSING,
      };
    case `${DELETE_MARKER}_DONE`:
      return {
        ...state,
        markers: _.reject(state.markers, { id: action.data }),
        processingMarkerId: -1,
        deleteMarkerStatus: APIStatus.DONE,
      };
    case `${DELETE_MARKER}_FAILED`:
      return {
        ...state,
        processingMarkerId: -1,
        deleteMarkerStatus: APIStatus.FAILED,
      };

    case `${SAVE_MARKER}_START`:
      return { ...state, saveMarkerStatus: APIStatus.PROCESSING };
    case `${SAVE_MARKER}_DONE`:
      return {
        ...state,
        saveMarkerStatus: APIStatus.DONE,
      };
    case `${SAVE_MARKER}_FAILED`:
      return {
        ...state,
        saveMarkerStatus: APIStatus.FAILED,
      };

    case `${UPDATE_MARKER}_START`:
      return {
        ...state,
        processingMarkerId: action.data.id,
        updateMarkerStatus: APIStatus.PROCESSING,
      };
    case `${UPDATE_MARKER}_DONE`:
      const index: number = _.findIndex(state.markers, {id: action.data.id});
      if (index < 0) {
        return state;
      }
      const markers: Array<T.Marker> = _.concat(
        _.slice(state.markers, 0, index),
        action.data,
        _.slice(state.markers, index + 1),
      );

      return {
        ...state,
        markers,
        processingMarkerId: -1,
        updateMarkerStatus: APIStatus.DONE,
      };
    case `${UPDATE_MARKER}_FAILED`:
      return {
        ...state,
        processingMarkerId: -1,
        updateMarkerStatus: APIStatus.FAILED,
      };

    default:
      return state;
  }
};
export default reducer;
