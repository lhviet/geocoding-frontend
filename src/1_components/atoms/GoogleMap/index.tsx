import React, {PureComponent, RefObject} from 'react';
import * as _ from 'lodash-es';
import styled, {AnyStyledComponent} from 'styled-components';

const Map: AnyStyledComponent = styled.div`
  height: 500px;
  width: 100%;
`;

function initMap(elem: HTMLElement): void {
  // The location of Berlin
  const berlin = {lat: 52.5074434, lng: 13.3903913};
  // The map, centered at Berlin
  const map = new google.maps.Map(elem, {zoom: 12, center: berlin});
  // The marker, positioned at Berlin
  new google.maps.Marker({position: berlin, map: map});
}

interface Props {
  isGoogleMapReady?: boolean;
}

class GoogleMap extends PureComponent<Props> {
  private readonly mapElem: RefObject<HTMLDivElement>;
  private readonly createMap: any = _.once(initMap);

  constructor(props: Props) {
    super(props);
    this.mapElem = React.createRef();
  }

  componentDidMount(): void {
    if (this.props.isGoogleMapReady) {
      this.createMap(this.mapElem.current);
    }
  }

  componentDidUpdate(): void {
    if (this.props.isGoogleMapReady) {
      this.createMap(this.mapElem.current);
    }
  }

  render() {
    return (
      <Map ref={this.mapElem} />
    );
  }
}

export default GoogleMap;