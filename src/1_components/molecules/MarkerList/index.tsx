import React, { Component } from 'react';
import styled from 'styled-components';

import MarkerListItem from '../../atoms/MarkerListItem';
import { Marker } from '../../../types';

const Root = styled.ul`
  padding: 0;
  list-style: none;
`;

export interface Props {
  markers: Array<Marker>;
  deleteMarker(id: number): void;
  className?: string;
}

export interface State {
}

class MarkerList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { markers, deleteMarker, className }: Props = this.props;

    const markerItems: React.ReactNode = markers
      .map((m, index) => <MarkerListItem
        key={`m_${index}`}
        marker={m}
        onDelete={deleteMarker}
      />);

    return (
      <Root className={className}>
        {markerItems}
      </Root>
    );
  }
}

export default MarkerList;
