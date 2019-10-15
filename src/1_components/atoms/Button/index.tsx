import React from 'react';
import styled from 'styled-components';

import { styles } from '../../../5_constants/theme';

const Root = styled.button`
  ${styles.primaryOutlineBtn};
  
  font-size: .8rem;
  line-height: 1.1;
  min-width: 4.2rem;
`;

export default React.memo(Root);
