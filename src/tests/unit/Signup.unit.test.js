/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow } from '../enzyme';
import Signup from '../../containers/signup/Signup';

describe('Signup', () => {
  it('should render the signup page and', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Signup />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should contain all the input fields nodes with an ID', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find('#usernameID').props().id).toBe('usernameID');
    expect(wrapper.find('#passwordID').props().id).toBe('passwordID');
    expect(wrapper.find('#confirmpasswordID').props().id).toBe('confirmpasswordID');  
  });
});
