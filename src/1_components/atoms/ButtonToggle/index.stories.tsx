import { storiesOf } from '@storybook/react';
import React from 'react';

import ButtonToggle from './index';

storiesOf('Atoms|ButtonToggle', module)
  .add('default', () => {
    return (
      <ButtonToggle>Germany</ButtonToggle>
    );
  })
  .add('toggled', () => {
    return (
      <ButtonToggle isToggled={true}>Germany</ButtonToggle>
    );
  });
