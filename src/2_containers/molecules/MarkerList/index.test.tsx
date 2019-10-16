import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import * as T from '../../../types';
import { mockState, mockStore } from '../../../mock-test/mock-store';

import { UPDATE_MARKER } from '../../../3_store/ducks/marker';

import { makeStart } from '../../../4_services/action-service';

import MarkerList, { DispatchProps, mapDispatchToProps, mapStateToProps, StateProps } from './index';

const mockMarker: T.Marker = mockState.marker.markers[0];

describe('DispatchProps', () => {
  let dispatch: jest.Mock;
  let dispatchProps: DispatchProps;

  beforeEach(() => {
    dispatch = jest.fn();
    dispatchProps = mapDispatchToProps(dispatch);
  });

  it('should call dispatch when deleteMarker', () => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    dispatchProps.deleteMarker!(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch updateMarker correctly', () => {
    expect(dispatch).toHaveBeenCalledTimes(0);
    dispatchProps.updateMarker!(mockMarker);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: makeStart(UPDATE_MARKER).type,
      data: mockMarker,
    });
  });
});

describe('StateProps', () => {
  type MockState = Pick<T.StoreState, 'marker'>;
  const state: MockState = mockStore.getState();
  let stateProps: StateProps;

  beforeEach(() => {
    stateProps = mapStateToProps(state);
  });

  it('should have one marker', () => {
    expect(stateProps.markers).toHaveLength(0);
  });
});

describe('Connected MarkerList', () => {
  it('should not emit an error during rendering', () => {
    expect(() => {
      mount(
        <Provider store={mockStore}>
          <MarkerList />
        </Provider>,
      );
    }).not.toThrowError();
  });
});