import React from 'react';
import styled from 'styled-components';

import { alpha, colors, } from '../../../5_constants/theme';

interface Props {
  isVisible: boolean;
}
const Root = styled.div<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.isVisible ? '100%' : '0'};
  height: ${props => props.isVisible ? '100%' : '0'};
  cursor: wait;
  background-color: ${colors.white.alpha(alpha.alph5).toString()};
`;

export default React.memo(Root);
