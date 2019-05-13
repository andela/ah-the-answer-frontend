/* eslint-disable import/named */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import expect from 'expect';
import Axios from 'axios';
import { mount, shallow } from '../../enzyme';
import { InitiatePasswordReset } from '../../../containers/PasswordReset/InitiatePasswordReset';
import { ResetPassword } from '../../../containers/PasswordReset/resetPassword';


const setUp = () => {
  const props = {
    // eslint-disable-next-line no-undef
    handleSubmit: jest.fn(),
    // eslint-disable-next-line no-undef
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
describe(' password reset page rendered ', () => {
  const { wrapper } = setUp();
  // eslint-disable-next-line no-undef
  it(' render request password reset form ', () => {
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


// // New tests _________________________
// eslint-disable-next-line no-undef
const NewsetUp = (props = {}) => {
  const component = mount(
    <Router>
      <ResetPassword {...props} />
    </Router>,
  );
  return component;
};

const findAtribute = (component, id) => {
  const wrapper = component.find(id);
  return wrapper;
};

describe('Test reset password page loads', () => {
  let component;
  beforeEach(() => {
    component = NewsetUp();
  });
  it('Should render componet without errors', () => {
    const wrapper = findAtribute(component, '.container');
    expect(wrapper.exists()).toBe(true);
  });
  // eslint-disable-next-line no-undef
  it('Should render reset password form', () => {
    const wrapper = findAtribute(component, '.form-wrapper');
    expect(wrapper.exists()).toBe(true);
  });
});
