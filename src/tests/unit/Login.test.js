/* eslint-disable quotes */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
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

describe('Login Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render without errors', () => {
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

  // it('Should return new state on receiving type', () => {
  //   const userResponse = {
  //     user: {
  //       email: 'johndoe@gmail.com',
  //       username: 'johndoe',
  //     },
  //   };
  //   signInUser(userResponse);
  //   console.log(signUser(userResponse));
  //   const newState = authReducer(undefined, {
  //     type: 'USER_SIGN_IN',
  //     userResponse,
  //   });
  //   expect(newState.auth).toEqual(null);
  // });
});
