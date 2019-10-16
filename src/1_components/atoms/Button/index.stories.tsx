import { storiesOf } from '@storybook/react';
import React from 'react';

import Button from './';

storiesOf('Atoms|Button', module)
  .add('default', () => {
    return (
      <Button>Primary Button</Button>
    );
  });
