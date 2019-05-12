/* eslint-disable no-undef */
import React from 'react';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow } from '../enzyme';
import Signup from '../../containers/signup/Signup';

describe('Signup', () => {
  it('should highlight fields with errors', () => {
    const wrapper = shallow(<Signup />);
    const password = wrapper.find('input#passwordID');
    const confirmPassword = wrapper.find('input#confirmpasswordID');

    password.simulate('change', {
      target: {
        name: 'password',
        value: 'test1234',
      },
    });
    confirmPassword.simulate('change', {
      target: {
        name: 'confirmPassword',
        value: 'test5678',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: [{ value: '' }],
    });

    expect(wrapper.state().errors.passwordConfirm.error).toBe(true);
    expect(wrapper.state().errors.passwordConfirm.message).toEqual(['Passwords do not match']);
  });

  describe('should render errors from API', () => {
    const spy = jest.spyOn(Signup.prototype, 'handleSubmit');
    const wrapper = shallow(<Signup />);
    const mockErrorResponse = {
      errors: {
        email: ['A user with this email already exists'],
        username: ['A user with this username already exists'],
        password: [
          'Please ensure your password contains at least one letter and one numeral',
          'Password should be at least 8 characters long',
        ],
      },
    };

    beforeEach(() => {
      const mock = new MockAdapter(Axios);
      mock
        .onPost('https://ah-the-answer-backend-staging.herokuapp.com/api/users/')
        .reply(400, mockErrorResponse);

      wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
        target: [{ value: '' }],
      });
    });

    it('should call handleSubmit', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('should update the state with error messages', () => {
      const { state } = wrapper.instance();
      expect(...state.errors.username.message).toBe(...mockErrorResponse.errors.username);
      expect(...state.errors.email.message).toBe(...mockErrorResponse.errors.email);
      expect(state.errors.password.message).toEqual(mockErrorResponse.errors.password);
      expect(state.errors.username.error).toBe(true);
      expect(state.errors.email.error).toBe(true);
      expect(state.errors.password.error).toBe(true);
    });

    it('should highlight fields with errors', () => {
      const username = wrapper.find('#usernameID').props().className;
      const email = wrapper.find('#emailID').props().className;
      const password = wrapper.find('#passwordID').props().className;

      expect(username).toMatch(/is-invalid/);
      expect(email).toMatch(/is-invalid/);
      expect(password).toMatch(/is-invalid/);
    });
  });
  describe('should render errors from API', () => {
    const wrapper = shallow(<Signup />);
    const spy = jest.spyOn(Signup.prototype, 'handleSubmit');
    const mockSuccessResponse = {
      user: {
        email: 'tester@mail.com',
        username: 'tester',
      },
    };

    beforeEach(() => {
      const mock = new MockAdapter(Axios);
      mock
        .onPost('https://ah-the-answer-backend-staging.herokuapp.com/api/users/')
        .reply(200, mockSuccessResponse);

      wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
        target: [{ value: '' }],
      });
    });

    it('should call handleSubmit', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('should update the state with a false error state', () => {
      const { state } = wrapper.instance();
      expect(state.errors.username.error).toBe(false);
      expect(state.errors.email.error).toBe(false);
      expect(state.errors.password.error).toBe(false);
    });
  });
});
