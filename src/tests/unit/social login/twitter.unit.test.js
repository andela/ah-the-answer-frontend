import React from 'react';
import { mount, shallow } from '../../enzyme';
import TwitterLogin from '../../../containers/Login/twitter';
import Login from '../../../containers/Login/Login';


describe('Twitter component', () => {
  it('it renders the button', () => {
    const wrapper = shallow(<TwitterLogin />);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.type()).toEqual('button');
  });
  it('loads in the login page', () => {
    const wrapper = mount(<Login/>);
    const login = wrapper.find(TwitterLogin);
    expect(login.exists()).toEqual(true);
  })
});
