import React from 'react';
import styled from 'styled-components';

import { styles } from '../../../5_constants/theme';

const Root = styled.button`
  ${styles.primaryOutlineBtn};
  
  font-size: .8rem;
  min-width: 5rem;
`;

export default React.memo(Root);
