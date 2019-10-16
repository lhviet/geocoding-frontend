import React from 'react';
import { shallow } from 'enzyme';

import Button from './';

it('Button should render correctly', () => {
  const component = shallow(<Button />);
  expect(component).toBeTruthy();
});
