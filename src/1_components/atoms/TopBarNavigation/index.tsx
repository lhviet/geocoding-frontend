import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../../5_constants/theme';

const LOGO_URL = 'https://assets.medwing.com/assets/medwing-logo-a16f53c97bcdad957ebd8c75d588820c7a8f61b73e356a27bef60ee0afadc77d.png';

const Root = styled.nav`
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  padding: .5rem .8rem;
  background-color: ${colors.bgBlue.toString()};  
`;
const NavBrandIcon = styled.img.attrs({
  alt: 'logo',
  src: LOGO_URL,
})`
  position: absolute;
  left: .5rem;
  width: 2rem;
  height: 2rem;
`;

interface Props {
  className?: string;
}

const TopBarNavigation: FC<Props> = (
  { className }: Props
) => {
   return (
    <Root className={className}>
      <NavLink to="/" exact={true}>
        <NavBrandIcon />
      </NavLink>
    </Root>
  );
};

export default memo(TopBarNavigation);
