/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import SignupSuccess from '../../containers/signup/SignupSuccess';

describe('Signup on success', () => {
  it('should render the signup success page ', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignupSuccess />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
