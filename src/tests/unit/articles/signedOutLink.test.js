import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from '../../enzyme';
import SignedOutLinks from '../../../components/SignedOutLinks';

describe('render featured article', () => {
  it('should render the summary of a featured article', () => {
    let wrapper;
    wrapper = mount(<Router><SignedOutLinks /></Router>);
    const response = wrapper.find(`[data-test="signedOutLink"]`);
    expect(response.length).toBe(1);
  });
})