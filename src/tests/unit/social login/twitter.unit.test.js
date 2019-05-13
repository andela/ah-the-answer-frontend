import React from 'react';
import { mount, shallow } from '../../enzyme';
import TwitterLogin from '../../../containers/Login/twitter';

describe('Twitter component', () => {
  it('it renders the button', () => {
    const wrapper = shallow(<TwitterLogin />);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.type()).toEqual('button');
  });
});
