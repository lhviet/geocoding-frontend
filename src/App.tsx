import React, { Component } from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import * as T from './types';

import GoogleMap from './1_components/atoms/GoogleMap';
import TopBarNavigation from './1_components/atoms/TopBarNavigation';

import LeftSideBar from './2_containers/organism/LeftSideBar';

import { getMarkers } from './3_store/ducks/marker';

const Root: AnyStyledComponent = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const Body: AnyStyledComponent = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 3rem);
`;

const RightContainer: AnyStyledComponent = styled.div`
  display: inline-block;
  width: calc(100% - 340px);
  height: 100%;
  vertical-align: top;
  
  overflow-y: auto;
  overscroll-behavior: contain;
`;

interface Props {
  markers: Array<T.Marker>;
  getMarkers(): void;
}

interface State {
  isGoogleMapReady: boolean;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isGoogleMapReady: false,
    };

    // Asynchronously checking if Google Map JavaScript API loaded successfully
    const googleMapLoadTimer = setInterval(() => {
      if (google.maps) {
        this.setState({ isGoogleMapReady: true });
        clearInterval(googleMapLoadTimer);
      }
    }, 500);
  }

  componentDidMount(): void {
    this.props.getMarkers();
  }

  render() {
    return (
      <Root>
        <TopBarNavigation />
        <Body>
          <LeftSideBar />
          <RightContainer>
            <GoogleMap isGoogleMapReady={this.state.isGoogleMapReady} markers={this.props.markers} />
          </RightContainer>
        </Body>
      </Root>
    );
  }
}

const mapStateToProps = ({ marker }: T.StoreState) => {
  return {
    markers: marker.markers,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getMarkers() {
    dispatch(getMarkers());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
