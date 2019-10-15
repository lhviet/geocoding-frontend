import React, { Component } from 'react';
import styled from 'styled-components';

import { Marker } from '../../../types';

import { alpha, colors } from '../../../5_constants/theme';

import MarkerInfo from '../MarkerInfo';
import Button from '../Button';

const Root = styled.li`
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 1px;
  color: ${colors.grey.toString()};
  transition: ease .2s;
  border-bottom: solid 1px ${colors.borderGray.alpha(alpha.alpha4).toString()};
  border-top: solid 1px transparent;
  border-left: solid 1px transparent;
  border-right: solid 1px transparent;
  
  :hover {
    border-bottom-color: ${colors.blueDark.toString()};
  }
`;
const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;
const Description = styled.div`
  font-size: 1.2rem;
`;
const ButtonWrapper = styled.div`
  padding: 0.2rem 0;
  text-align: right;
`;

interface Props {
  marker: Marker;
  className?: string;
  onDelete(id: number): void;
}

class MarkerListItem extends Component<Props> {
  render() {
    const { marker, onDelete, className }: Props = this.props;

    return (
      <Root className={className} >
        <Title>{marker.title}</Title>
        <Description>{marker.desc}</Description>
        <MarkerInfo
          lat={marker.lat}
          lng={marker.lng}
          updated={marker.updated_at}
          created={marker.created_at}
        />
        <ButtonWrapper>
          <Button onClick={() => console.log('edit', marker.id)}>Edit</Button>
          <Button onClick={() => onDelete(marker.id)}>Delete</Button>
        </ButtonWrapper>
      </Root>
    );
  }
}

export default MarkerListItem;
