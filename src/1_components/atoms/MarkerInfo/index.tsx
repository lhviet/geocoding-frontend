import React, { FC, memo } from 'react';
import styled from 'styled-components';
import dateformat from 'dateformat';

import { alpha, colors } from '../../../5_constants/theme';

const Root = styled.table`
  width: 100%;
  border: none;
`;
const Body = styled.tbody``;
const Row = styled.tr``;
const ColTitle = styled.td`
  font-size: 0.9rem;
  color: ${colors.grey.alpha(alpha.alpha8).toString()};
`;
const ColValue = styled.td`
  font-size: 1rem;
  text-align: right;
`;

const DATE_FORMAT = 'ddd, mmm dS, yyyy, HH:MM';
const getFormattedDate: (date: Date) => string = (date) => dateformat(date, DATE_FORMAT);

interface Props {
  lat: number;
  lng: number;
  updated: Date;
  created: Date;
  className?: string;
}

const MarkerInfo: FC<Props> = ({ lat, lng, updated, created, className }: Props) => {
  return (
    <Root className={className} >
      <Body>
        <Row>
          <ColTitle>Latitude</ColTitle>
          <ColValue>{lat}</ColValue>
        </Row>
        <Row>
          <ColTitle>Longitude</ColTitle>
          <ColValue>{lng}</ColValue>
        </Row>
        <Row>
          <ColTitle>Updated</ColTitle>
          <ColValue>{getFormattedDate(updated)}</ColValue>
        </Row>
        <Row>
          <ColTitle>Created</ColTitle>
          <ColValue>{getFormattedDate(created)}</ColValue>
        </Row>
      </Body>
    </Root>
  );
};

export default memo(MarkerInfo);
