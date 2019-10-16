import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import SearchInputField from './';

storiesOf('Molecules|SearchInputField', module)
  .add('default', () => {
    return (
      <SearchInputField search={action('Search')} />
    );
  })
  .add('searching', () => {
    return (
      <SearchInputField search={action('Search')} isSearching={true} />
    );
  });
