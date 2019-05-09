import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import expect from 'expect';
import { mount } from '../../enzyme';

import { ResetPassword } from '../../../containers/PasswordReset/ResetPassword';

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
  it(' render reset password r form ', () => {
    const ResetForm = wrapper.find('.form-wrapper');
    expect(ResetForm.exists())
      .toBe(true);
  });

  // eslint-disable-next-line no-undef
  it(' test handle onsubmit event', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
  });
});
