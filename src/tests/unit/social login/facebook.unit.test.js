import React from 'react';
import { mount, shallow } from '../../enzyme';
import FacebookLogin from '../../../containers/Login/facebook';
import Login from '../../../containers/Login/Login';


describe('Facebook component', () => {
  it('it renders the button', () => {
    const wrapper = shallow(<FacebookLogin />);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.type()).toEqual('button');
  })
  it('loads in the login page', () => {
    const wrapper = mount(<Login/>);
    const login = wrapper.find(FacebookLogin);
    expect(login.exists()).toEqual(true);
  })
});
