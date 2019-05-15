import React from 'react';
import { mount, shallow } from '../../enzyme';
import RatingDisplay from '../../../containers/articles/RatingDisplay';

describe('test RatingDisplay component', () => {
    it('should render', () => {
    const wrapper = shallow(<RatingDisplay />);
    expect(wrapper.exists()).toBe(true);
      });
    
    it('renders a given number', () => {
    const wrapper = shallow(<RatingDisplay number={5} />);
    const text = wrapper.find('p').text();
    expect(text).toEqual('5 Star');
    });
    
});