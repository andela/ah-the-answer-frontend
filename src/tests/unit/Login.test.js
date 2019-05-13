/* eslint-disable quotes */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '../../containers/Login/Login';
import authReducer from '../../store/reducers/authReducer';
import { mapStateToProps, mapDispatchToProps } from '../../containers/Login/Login';

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

describe('Test form submission', () => {
  const props = {
    signInUser: jest.fn(),
  };
  const wrapper = mount(
    <Router>
      <Login {...props} />
    </Router>,
  );
  const email = wrapper.find('#emailID');
  const password = wrapper.find('#passwordID');

  email.simulate('change', {
    target: {
      type: 'email',
      value: 'johndoe@test.com',
    },
  });
  password.simulate('change', {
    target: {
      type: 'password',
      value: 'johndoe123',
    },
  });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
    target: [{ value: '' }],
  });
});

describe('test mapStateToProps', () => {
  it('should show initial state values when running mapStateToProps function', () => {
    const initialState = {
      auth: {
        authError: 'error',
        errorMessages: 'error message',
      },
    };

    // Just call the method directly passing in sample data
    // to make sure it does what it's supposed to
    expect(mapStateToProps(initialState).authError).toEqual('error');
  });
});

describe('test mapDispatchToProps', () => {
  it('should roll the dice again when button is clicked', () => {
    const dispatch = jest.fn();
    const signInUser = dispatch({ type: 'USER_SIGN_IN' });

    // For the `mapDispatchToProps`, call it directly but pass in
    // a mock function and check the arguments passed in are as expected
    mapDispatchToProps(dispatch).signInUser();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'USER_SIGN_IN' });
  });
});
