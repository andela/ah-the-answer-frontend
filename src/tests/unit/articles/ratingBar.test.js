import React from 'react';
import { mount, shallow } from '../../enzyme';
import RatingBar from '../../../containers/articles/RatingBar';
import { log } from 'util';
import { postRating } from '../../../store/actions/articleActions';

describe('test RatingDisplay component', () => {
    it('should render', () => {
    const wrapper = shallow(<RatingBar />);
    expect(wrapper.exists()).toBe(true);
    });
    
    it('should render', () => {
    const wrapper = mount(<RatingBar />);
    expect(wrapper.exists()).toBe(true);
    });

    it('renders default stars when provided no props', () => {
    const wrapper = mount(
        <RatingBar />,
    );
    const starBar = wrapper.find('span').at(0)
    expect(starBar.props().style.color).toEqual('#f1f1f1');
    });

    it('stars render default color "f1f1f1" when provided no props and not clicked', () => {
    const wrapper = mount(
        <RatingBar />,
    );
    const starBar = wrapper.find('span').at(0)
    expect(starBar.props().style.color).toEqual('#f1f1f1');
    });

    it('1st star renders color "ffd700" when clicked', () => {
    const wrapper = mount(
        <RatingBar postRating={postRating}/>,
    );
    const starBar = wrapper.find('span').at(0)
    starBar.simulate('click')
    expect(starBar.instance().style.color).toEqual('rgb(255, 215, 0)');
    });

    it('change "userRating" state value to 5 when 5th star is clicked', () => {
    const wrapper = mount(
        <RatingBar ratingValue={0} postRating={postRating}/>,
    );
    wrapper.setProps({ userRating: 0 });
    const starBar = wrapper.find('span').at(4)
    starBar.simulate('click')
    console.log(starBar.instance().style.color)
    expect(wrapper.state().userRating).toEqual(5);
    });

});