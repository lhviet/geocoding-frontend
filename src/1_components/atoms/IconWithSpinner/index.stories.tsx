import { storiesOf } from '@storybook/react';
import React from 'react';

import IconWithSpinner, { IconType } from './';

storiesOf('Atoms|IconWithSpinner', module)
  .add('default', () => {
    return (
      <IconWithSpinner iconType={IconType.search} />
    );
  })
  .add('loading', () => {
    return (
      <IconWithSpinner iconType={IconType.search} isLoading={true} />
    );
  });
