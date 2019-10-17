import React from 'react';
import { shallow } from 'enzyme';

import ButtonToggle from './index';

it('ButtonToggle should render correctly', () => {
  const component = shallow(<ButtonToggle />);
  expect(component).toBeTruthy();
});
