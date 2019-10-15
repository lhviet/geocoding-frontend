import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StoreState } from '../../../types';

import LeftSideBar from '../../../1_components/organisms/LeftSideBar';

import { actionGeoCoding } from '../../../3_store/ducks/map';


const mapStateToProps = ({ marker }: StoreState) => {
  return {
    markers: marker.markers,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  search(keywords: string) {
    console.log('search = ', keywords);
    dispatch(actionGeoCoding(keywords));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar);
