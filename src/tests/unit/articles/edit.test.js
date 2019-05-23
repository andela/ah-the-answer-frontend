import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from '../../enzyme';
import Edit from '../../../components/Edit';

describe('render Edit', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      slug: {
        slug: 'test',
      },
    };
    wrapper = mount(<Router><Edit {...props} /></Router>);
  });
  it('should render edit component', () => {
    const response = wrapper.find(`[data-test="Edit"]`);
    expect(response.length).toBe(1);
  });
});