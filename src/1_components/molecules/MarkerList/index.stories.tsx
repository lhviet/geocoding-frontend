import { storiesOf } from '@storybook/react';
import React from 'react';

import * as T from '../../../types';

import MarkerList from './index';

storiesOf('Molecules|MarkerList', module)
  .add('default', () => {
    const marker: (num: number) => T.Marker = (num) => ({
      id: num,
      title: `Marker ${num}`,
      lat: 80,
      lng: 120,
      desc: `Marker ${num} description`,
    });

    return (
      <MarkerList markers={[marker(1), marker(2)]} />
    );
  });
