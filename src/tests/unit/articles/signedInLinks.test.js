import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from '../../enzyme';
import SignedInLinks from '../../../components/SignedInLinks';

describe('render signed in links', () => {
  it('should render links when user is signed in', () => {
    let wrapper;
    wrapper = mount(<Router><SignedInLinks /></Router>);
    const response = wrapper.find(`[data-test="signedInLink"]`);
    expect(response.length).toBe(1);
  });
})