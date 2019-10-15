import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GeocodingLocale, StoreState } from '../../../types';

import LeftSideBar, { Props } from '../../../1_components/organisms/LeftSideBar';

import { geocoding } from '../../../3_store/ducks/map';

type StatePropKeys = 'isSearching';
type DispatchPropKeys = 'search';
export type StateProps = Pick<Props, StatePropKeys>;
export type DispatchProps = Pick<Props, DispatchPropKeys>;

const mapStateToProps: (state: Pick<StoreState, 'map'>) => StateProps = ({ map }) => {
  return {
    isSearching: map.isProcessing,
  };
};
const mapDispatchToProps: (dispatch: Dispatch<Action>) => DispatchProps = (dispatch: Dispatch<Action>) => ({
  search(keywords: string, locale?: GeocodingLocale) {
    console.log('search = ', keywords, locale);
    dispatch(geocoding(keywords, locale));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar);
