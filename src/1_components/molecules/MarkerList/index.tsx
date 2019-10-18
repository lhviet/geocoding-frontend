import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

import * as T from '../../../types';

import MarkerListItem from '../MarkerListItem';
import Button from '../../atoms/Button';

const Root = styled.ul`
  padding: 0.2rem 0;
  list-style: none;
`;
const ButtonWrapper = styled.div`
  text-align: right;
`;
const ClearBtn = styled(Button)`
  position: relative;
  right: 0;
  margin-bottom: 0.2rem;
`;

export interface Props {
  markers: Array<T.Marker>;
  locateMarker(marker: T.Marker): void;

  // Geocoding feature
  saveMarker?(marker: T.Marker): void;
  clearLocations?(): void;

  // Markers feature
  processingMarkerId?: number,
  deleteMarkerStatus?: T.APIStatus,
  updateMarkerStatus?: T.APIStatus,
  updateMarker?(marker: T.Marker): void;
  deleteMarker?(id: number): void;

  className?: string;
}

class MarkerList extends Component<Props> {
  render() {
    const {
      markers, processingMarkerId, deleteMarkerStatus, updateMarkerStatus,
      locateMarker, saveMarker, clearLocations, updateMarker, deleteMarker, className,
    }: Props = this.props;

    const clearBtn: ReactNode = clearLocations !== undefined && markers.length > 0 ? (
      <ButtonWrapper>
        <ClearBtn onClick={clearLocations}>Clear All</ClearBtn>
      </ButtonWrapper>
    ) : undefined;

    const markerItems: ReactNode = markers
      .map((m, index) => {
        const isProcessing: boolean =
          processingMarkerId !== undefined && processingMarkerId === m.id &&
          (
            (deleteMarkerStatus !== undefined && deleteMarkerStatus === T.APIStatus.PROCESSING) ||
            (updateMarkerStatus !== undefined && updateMarkerStatus === T.APIStatus.PROCESSING)
          );

        return (
          <MarkerListItem
            key={`m_${index}`}
            marker={m}
            isProcessing={isProcessing}
            onLocate={locateMarker}
            onSave={saveMarker}
            onUpdate={updateMarker}
            onDelete={deleteMarker}
          />
        );
      });

    return (
      <Root className={className}>
        {clearBtn}
        {markerItems}
      </Root>
    );
  }
}

export default MarkerList;
