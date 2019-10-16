import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as T from '../../../types';

import MarkerList, { Props } from '../../../1_components/molecules/MarkerList';

import { deleteMarker, updateMarker } from '../../../3_store/ducks/marker';

type StatePropKeys = 'markers' | 'processingMarkerId' | 'deleteMarkerStatus' | 'updateMarkerStatus';
type DispatchPropKeys = 'deleteMarker' | 'updateMarker';
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
  deleteMarker(id: number): void {
    dispatch(deleteMarker(id));
  },
  updateMarker(marker: T.Marker): void {
    dispatch(updateMarker(marker));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);
