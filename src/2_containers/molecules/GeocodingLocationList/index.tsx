import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import * as T from '../../../types';

import MarkerList, { Props } from '../../../1_components/molecules/MarkerList';

import { saveMarker } from '../../../3_store/ducks/marker';
import { changeLocation, clearLocations } from '../../../3_store/ducks/map';

type StatePropKeys = 'markers';
type DispatchPropKeys = 'locateMarker' | 'saveMarker' | 'clearLocations';
export type StateProps = Pick<Props, StatePropKeys>;
export type DispatchProps = Pick<Props, DispatchPropKeys>;

const mapStateToProps: (state: Pick<T.StoreState, 'map'>) => StateProps = ({ map }) => {
  return {
    markers: map.locations,
  };
};

const mapDispatchToProps: (dispatch: Dispatch<Action>) => DispatchProps = (dispatch) => ({
  locateMarker(marker: T.Marker): void {
    dispatch(changeLocation(marker));
  },
  saveMarker(marker: T.Marker): void {
    dispatch(saveMarker(marker));
  },
  clearLocations(): void {
    dispatch(clearLocations());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);
