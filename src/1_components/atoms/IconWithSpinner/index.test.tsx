import React from 'react';
import { shallow } from 'enzyme';

import IconWithSpinner, { IconType } from './';

it('IconWithSpinner should render correctly', () => {
  const component = shallow(<IconWithSpinner iconType={IconType.search} />);
  expect(component.hasClass('fa-search')).toBe(true);
  expect(component.hasClass('fa-spinner')).toBe(false);
});

it('IconWithSpinner should render spinner', () => {
  const component = shallow(<IconWithSpinner iconType={IconType.search} isLoading={true} />);
  expect(component.hasClass('fa-spinner')).toBe(true);
});

it('IconWithSpinner should render spinner', () => {
  const onClick = jest.fn();
  const component = shallow(<IconWithSpinner iconType={IconType.search} onClick={onClick} />);
  component.simulate('click');
  component.simulate('click');

  expect(onClick.mock.calls.length).toEqual(2);
});
