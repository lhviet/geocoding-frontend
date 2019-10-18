import React, { Component, memo, RefObject } from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import _ from 'lodash-es';

import * as T from 'types';

const Root: AnyStyledComponent = styled.div`
  height: 100%;
  width: 100%;
`;

/**
 * @todo Below helper functions could be relocate to 4_services directory if it need further sharing
 */
const ZOOM_DEFAULT: number = 8;
const ZOOM_CENTER: number = 12;
function initMap(elem: HTMLElement, markers?: Array<T.Marker>): google.maps.Map {
  // The location of Berlin
  const berlin = { lat: 52.5074434, lng: 13.3903913 };
  // The map, centered at Berlin
  return new google.maps.Map(elem, {zoom: ZOOM_DEFAULT, center: berlin});
}
function setMarkers(map: google.maps.Map, markers: Array<T.Marker>) {
  // Set new Markers
  return markers
    .map((m) => new google.maps.Marker({
      title: m.title,
      position: markerToLatLng(m),
      map,
    }));
}
function setMapCenter(map: google.maps.Map, marker: T.Marker): google.maps.Marker {
  const position: google.maps.LatLngLiteral = markerToLatLng(marker);
  map.setCenter(position);
  map.setZoom(ZOOM_CENTER);
  return new google.maps.Marker({
    title: marker.title,
    position,
    map,
    animation: google.maps.Animation.DROP,
  });
}

const mapMarkerToPoint: (marker: google.maps.Marker) => T.Point | [] = (m) => {
  const position: google.maps.LatLng | undefined | null = m.getPosition();
  if (position) {
    return [position.lat(), position.lng()];
  }

  return [];
};
const markerToPoint: (marker: T.Marker) => T.Point = ({lat, lng}) => [lat, lng];
const markerToLatLng: (marker: T.Marker) => google.maps.LatLngLiteral = ({lat, lng}) => ({ lat, lng });

/**
 * @info Check whether the Markers' locations updated, not title or description of the Markers
 */
function areMarkersEqual(markers1: Array<T.Marker>, markers2: Array<T.Marker>): boolean {
  const hash1: string = _.join(_.flatten(markers1.map(markerToPoint)));
  const hash2: string = _.join(_.flatten(markers2.map(markerToPoint)));

  return hash1 === hash2;
}
function areMapMarkersEqual(mapMarkers: Array<google.maps.Marker>, markers: Array<T.Marker>): boolean {
  const hash1: string = _.join(_.flatten(mapMarkers.map(mapMarkerToPoint)));
  const hash2: string = _.join(_.flatten(markers.map(markerToPoint)));

  return hash1 === hash2;
}

/**
 * @info Checking if the map need to re-render
 */
function arePropsEqual(prevProps: Props, props: Props): boolean {
  if (
    (!prevProps.isGoogleMapReady && props.isGoogleMapReady) ||
    (!!prevProps.center !== !!props.center)
  ) {
    return false;
  }

  let areMarkersSame: boolean = areMarkersEqual(prevProps.markers, props.markers);
  if (areMarkersSame) {
    if (prevProps.center === undefined && props.center === undefined) {
      return true;
    }
    if (!!prevProps.center && !!props.center) {
      return areMarkersEqual([prevProps.center], [props.center]);
    }
  }

  return  false;
}

interface Props {
  isGoogleMapReady?: boolean;
  markers: Array<T.Marker>;
  center?: T.Marker;
}

class GoogleMap extends Component<Props> {
  private readonly mapElem: RefObject<HTMLDivElement>;
  private map: google.maps.Map | undefined;
  private mapMarkers: Array<google.maps.Marker> = [];
  private mapCenterMarker: google.maps.Marker | undefined;

  constructor(props: Props) {
    super(props);
    this.mapElem = React.createRef();
  }

  componentDidMount(): void {
    if (this.props.isGoogleMapReady && this.mapElem.current) {
      this.map = initMap(this.mapElem.current);
    }
  }

  componentDidUpdate(prevProps: Props): void {
    if (!this.map && this.props.isGoogleMapReady && this.mapElem.current) {
      this.map = initMap(this.mapElem.current);
    }
    if (this.map) {
      if (!areMapMarkersEqual(this.mapMarkers, this.props.markers)) {
        // Clear all Markers
        this.mapMarkers.forEach((m) => m.setMap(null));

        this.mapMarkers = setMarkers(this.map, this.props.markers);
      }
      if (
        (!prevProps.center && this.props.center) ||
        (
          prevProps.center &&
          this.props.center &&
          !areMarkersEqual([prevProps.center], [this.props.center])
        )
      ) {
        // Update new center & zoom
        if (this.mapCenterMarker) {
          this.mapCenterMarker.setMap(null);
        }
        this.mapCenterMarker = setMapCenter(this.map, this.props.center)
      }
    }
  }

  render() {
    return (
      <Root ref={this.mapElem} />
    );
  }
}

export default memo(GoogleMap, arePropsEqual);