import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { colors, styles } from '../../../5_constants/theme';

import SearchInputField from '../../molecules/SearchInputField';

import MarkerList from '../../../2_containers/molecules/MarkerList';
import GeocodingLocationList from '../../../2_containers/molecules/GeocodingLocationList';

const Root = styled.div`
  ${styles.scrollbar};
  overflow: auto;
  
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  width: 299px;
  height: 100%;
  background-color: #fff;
  border-right: solid 1px ${colors.borderGray.toString()};
`;

function arePropsEqual(prevProps: Props, props: Props): boolean {
  return prevProps.isSearching === props.isSearching;
}

export interface Props {
  isSearching: boolean;
  className?: string;
  search(value: string, locale?: string): void;
}

const LeftSideBar: FC<Props> = ({ isSearching, search, className }: Props) => {
  return (
    <Root className={className}>
      <SearchInputField search={search} isSearching={isSearching}/>
      <GeocodingLocationList />
      <h2>Your Markers</h2>
      <MarkerList />
    </Root>
  );
};

export default memo(LeftSideBar, arePropsEqual);
