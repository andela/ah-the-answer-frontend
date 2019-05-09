import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import expect from 'expect';
import { mount } from '../../enzyme';


import { mapStateToProps, InitiatePasswordReset } from '../../../containers/PasswordReset/InitiatePasswordReset';

const setUp = () => {
  const props = {
    handleSubmit: jest.fn(),
    requestPasswordReset: jest.fn(),
  };
  const wrapper = mount(
    <Router>
      <InitiatePasswordReset {...props} />
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
  it(' render request password reset form ', () => {
    const ResetForm = wrapper.find('.form-wrapper');
    expect(ResetForm.exists())
      .toBe(true);
  });

  it(' test handle onsubmit event', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    });
  });
});
