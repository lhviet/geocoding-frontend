import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

import { colors, alpha } from '../../../5_constants/theme';

interface Props {
  isToggled?: boolean;
}
const Root = styled(Button)<Props>`
  color: ${props => props.isToggled ? colors.white.toString() : colors.green.toString()};
  background-color: ${props => props.isToggled ? colors.green.toString() : colors.white.toString()};
  border-color: ${colors.green.alpha(alpha.alpha8).toString()};
`;

export default React.memo(Root);
