import React from 'react';
import { mount, shallow } from '../../enzyme';
import RatingBar from '../../../containers/articles/RatingBar';

describe('test RatingDisplay component', () => {
    it('should render', () => {
    const wrapper = shallow(<RatingBar />);
    expect(wrapper.exists()).toBe(true);
    });
    
    it('should render', () => {
    const wrapper = mount(<RatingBar />);
    expect(wrapper.exists()).toBe(true);
    });
    
});