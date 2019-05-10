import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import expect from 'expect';
import { mount } from '../../enzyme';

// eslint-disable-next-line import/named
import { ResetPassword } from '../../../containers/PasswordReset/resetPassword';

const setUp = () => {
  const props = {
    // eslint-disable-next-line no-undef
    handleSubmit: jest.fn(),
    // eslint-disable-next-line no-undef
    resetPassword: jest.fn(),
  };
  const wrapper = mount(
    <Router>
      <ResetPassword {...props} />
    </Router>,
  );
  return {
    props,
    wrapper,
  };
};

// eslint-disable-next-line no-undef
describe('Request password reset page rendered ', () => {
  const { wrapper } = setUp();
  // eslint-disable-next-line no-undef
  it(' render reset password  form ', () => {
    const ResetForm = wrapper.find('.form-wrapper');
    expect(ResetForm.exists())
      .toBe(true);
  });

  // eslint-disable-next-line no-undef
  it('should contain all the input fields with an ID', () => {
    expect(wrapper.find('#password').props().id).toBe('password');
    expect(wrapper.find('#confirmPassword').props().id).toBe('confirmPassword');
  });

  // eslint-disable-next-line no-undef
  it(' test handle onsubmit event', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
  });
});
