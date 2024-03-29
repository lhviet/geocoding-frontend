import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as T from '../../../types';

import MarkerList, { Props } from '../../../1_components/molecules/MarkerList';

import { deleteMarker, updateMarker } from '../../../3_store/ducks/marker';
import { changeLocation } from '../../../3_store/ducks/map';

type StatePropKeys = 'markers' | 'processingMarkerId' | 'deleteMarkerStatus' | 'updateMarkerStatus';
type DispatchPropKeys = 'locateMarker' | 'deleteMarker' | 'updateMarker';
export type StateProps = Pick<Props, StatePropKeys>;
export type DispatchProps = Pick<Props, DispatchPropKeys>;

export const mapStateToProps: (state: Pick<T.StoreState, 'marker'>) => StateProps = ({ marker }) => {
  return {
    markers: marker.markers,
    processingMarkerId: marker.processingMarkerId,
    deleteMarkerStatus: marker.deleteMarkerStatus,
    updateMarkerStatus: marker.updateMarkerStatus,
  };
};

export const mapDispatchToProps: (dispatch: Dispatch) => DispatchProps = (dispatch) => ({
  locateMarker(marker: T.Marker): void {
    dispatch(changeLocation(marker));
  },
  deleteMarker(id: number): void {
    dispatch(deleteMarker(id));
  },
  updateMarker(marker: T.Marker): void {
    dispatch(updateMarker(marker));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);
