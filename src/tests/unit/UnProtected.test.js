import { Authenticate, UnProtectedRoute } from '../../helpers/unProtected';
import { shallow } from 'enzyme';
import React from 'react';
describe('Authenticate Function', () => {
  it('should run authenticate function', () => {
    const user = {
      username: 'testuser',
      token: 'testtoken',
    };
    expect(Authenticate(user)).toBe(true);
  });
});

describe('UnProtected Component', () => {

	it('should test UnProtected Component', () => {
		const wrapper = shallow(<UnProtectedRoute/>)
		expect(wrapper.exists()).toBe(true)
	});
});