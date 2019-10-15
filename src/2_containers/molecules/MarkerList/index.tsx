import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { StoreState } from '../../../types';

import MarkerList, { Props } from '../../../1_components/molecules/MarkerList';

import { deleteMarker } from '../../../3_store/ducks/marker';

type StatePropKeys = 'markers';
type DispatchPropKeys = 'deleteMarker';
export type StateProps = Pick<Props, StatePropKeys>;
export type DispatchProps = Pick<Props, DispatchPropKeys>;

const mapStateToProps: (state: Pick<StoreState, 'marker'>) => StateProps = ({ marker }) => {
  return {
    markers: marker.markers,
  };
};

const mapDispatchToProps: (dispatch: Dispatch<Action>) => DispatchProps = (dispatch) => ({
  deleteMarker(id: number): void {
    dispatch(deleteMarker(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);
