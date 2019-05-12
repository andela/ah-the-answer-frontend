import React from 'react';
import { mount, shallow } from '../../enzyme';
import GoogleLogin from '../../../containers/Login/google';
import Login from '../../../containers/Login/Login';


describe('Google component', () => {
  it('it renders the button', () => {
    const wrapper = shallow(<GoogleLogin />);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.type()).toEqual('button');
  });
  it('loads in the login page', () => {
    const wrapper = mount(<Login />);
    const login = wrapper.find(GoogleLogin);
    expect(login.exists()).toEqual(true);
  });
});
