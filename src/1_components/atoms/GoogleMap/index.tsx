import React, { Component, memo, RefObject } from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import _ from 'lodash-es';

import * as T from 'types';

const Root: AnyStyledComponent = styled.div`
  height: 100%;
  width: 100%;
`;

function initMap(elem: HTMLElement, markers?: Array<T.Marker>): google.maps.Map {
  // The location of Berlin
  const berlin = { lat: 52.5074434, lng: 13.3903913 };
  // The map, centered at Berlin
  return new google.maps.Map(elem, {zoom: 8, center: berlin});
}

const markerToPoint: (marker: T.Marker) => T.Point = (m) => [m.lat, m.lng];
function arePropsEqual(prevProps: Props, props: Props): boolean {
  if (props.isGoogleMapReady && !prevProps.isGoogleMapReady) {
    return false;
  }

  const prevHash: string = _.join(_.flatten(prevProps.markers.map(markerToPoint)));
  const hash: string = _.join(_.flatten(props.markers.map(markerToPoint)));

  return prevHash === hash;
}

interface Props {
  isGoogleMapReady?: boolean;
  markers: Array<T.Marker>;
}

class GoogleMap extends Component<Props> {
  private readonly mapElem: RefObject<HTMLDivElement>;
  private map: google.maps.Map | undefined;
  private mapMarkers: Array<google.maps.Marker> = [];

  constructor(props: Props) {
    super(props);
    this.mapElem = React.createRef();
  }

  componentDidMount(): void {
    if (this.props.isGoogleMapReady && this.mapElem.current) {
      this.map = initMap(this.mapElem.current);
    }
  }

  componentDidUpdate(): void {
    if (!this.map && this.props.isGoogleMapReady && this.mapElem.current) {
      this.map = initMap(this.mapElem.current);
    }
    if (this.map) {
      // Clear all Markers
      this.mapMarkers.forEach((m) => m.setMap(null));

      // Set new Markers
      this.mapMarkers = this.props.markers
        .map(markerToPoint)
        .map(([lat, lng]) => ({ lat, lng }))
        .map((m) => new google.maps.Marker({ position: m, map: this.map }));
    }
  }

  render() {
    return (
      <Root ref={this.mapElem} />
    );
  }
}

export default memo(GoogleMap, arePropsEqual);