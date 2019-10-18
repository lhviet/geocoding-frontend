import { AnyAction, Reducer } from 'redux';
import { ActionsObservable, combineEpics, ofType } from 'redux-observable';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';

import * as T from '../../types';

import { getAPIUrl, HOST } from '../../5_constants/api';

import { headerJson } from '../../4_services/http-service';
import { makeDone, makeFailed, makeStart } from '../../4_services/action-service';

import { APIToMarker } from './marker';

// ----- ACTIONS & EPICS ----- //
export const GEO_CODING = 'MAP__GEO_CODING';
export const geocoding = (keywords: string, locale?: T.GeocodingLocale): AnyAction => makeStart(
  GEO_CODING,
  { keywords, locale },
);

export const CLEAR_LOCATIONS = 'MAP__CLEAR_LOCATIONS';
export const clearLocations = (): AnyAction => ({ type: CLEAR_LOCATIONS });

export const CHANGE_LOCATION = 'MAP__CHANGE_LOCATION';
export const changeLocation = (center: T.Marker): AnyAction => ({
  type: CHANGE_LOCATION,
  center
});

// ----- EPICs --------------------------------------------------------------------------------------------------------
const epicGeoCoding = (action$: ActionsObservable<AnyAction>) => action$.pipe(
  ofType(`${GEO_CODING}_START`),
  switchMap(({ data }) => {
    const locale: string = data.locale ? `&l=${data.locale}` : '';
    const url: string = `${getAPIUrl(HOST.api.geocoding_query)}?q=${data.keywords}${locale}`;
    return ajax.get(url, headerJson)
      .pipe(
        map(({response}) => response.map(APIToMarker)),
        mergeMap((data) => [
          makeDone(GEO_CODING, data),
        ]),
        catchError((ajaxError: AjaxError) => [makeFailed(GEO_CODING, ajaxError)]),
      )
  }),
);

export const epics = combineEpics(
  epicGeoCoding,
);

// ----- REDUCER ------------------------------------------------------------------------------------------------------
const initialState: T.MapState = {
  locations: [],
  isProcessing: false,
};
/**
 * Process only actions of MAP__
 */
const reducer: Reducer<T.MapState> = (state = initialState, action: AnyAction) => {
  // If this action is not belong to MARKER, return the original state
  if (action.type.indexOf('MAP__') !== 0) {
    return state;
  }

  switch (action.type) {
    case `${GEO_CODING}_START`:
      return {...state, isProcessing: true};
    case `${GEO_CODING}_DONE`:
      return {
        ...state,
        locations: action.data,
        isProcessing: false,
      };
    case `${GEO_CODING}_FAILED`:
      return { ...state, isProcessing: false };

    case CLEAR_LOCATIONS:
      return { ...state, locations: [] };

    case CHANGE_LOCATION:
      return { ...state, center: action.center };

    default:
      return state;
  }
};
export default reducer;
