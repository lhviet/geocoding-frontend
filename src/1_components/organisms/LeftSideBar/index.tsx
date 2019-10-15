import React, { Component } from 'react';
import styled from 'styled-components';

import { colors, styles } from '../../../5_constants/theme';

import logo from '../../../logo.svg';

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

export interface Props {
  isSearching: boolean;
  className?: string;
  search(value: string): void;
}

class LeftSideBar extends Component<Props> {
  render() {
    return (
      <Root>
        <SearchInputField search={this.props.search} isSearching={this.props.isSearching}/>
        <GeocodingLocationList />
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Your Markers</h2>
        <MarkerList />
      </Root>
    );
  }
}

export default LeftSideBar;
