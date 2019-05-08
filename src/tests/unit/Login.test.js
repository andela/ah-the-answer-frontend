/* eslint-disable quotes */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '../../containers/Login/Login';
import authReducer from '../../store/reducers/authReducer';

// eslint-disable-next-line no-undef

const setUp = (props = {}) => {
  const component = mount(
    <Router>
      <Login {...props} />
    </Router>,
  );
  return component;
};

const findByAttribute = (component, attr) => {
  const wrapper = component.find(`[data-set='${attr}']`);
  return wrapper;
};

describe('Tests Login Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render component without errors', () => {
    const wrapper = findByAttribute(component, 'loginTestDiv');
    expect(wrapper.exists()).toBe(true);
  });
  it('Should render login form', () => {
    const wrapper = findByAttribute(component, 'formTestDiv');
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Test reducer', () => {
  it('Should return default state', () => {
    const newState = authReducer(undefined, {});
    expect(newState.auth).toEqual([]);
    expect(newState.is_authenticated).toEqual(false);
    expect(newState.authError).toEqual(null);
    expect(newState.errorMessages).toEqual(null);
  });
});
describe('changes state', () => {
  const expectedState = { email: 'johndoe@test.com', password: 'johndoe123' };
  const newWrapper = shallow(<Login />);
  newWrapper.setState({ email: 'johndoe@test.com', password: 'johndoe123' });
  newWrapper.update();
  it('should update the state', () => {
    expect(newWrapper.state()).toEqual(expectedState);
  });
});
