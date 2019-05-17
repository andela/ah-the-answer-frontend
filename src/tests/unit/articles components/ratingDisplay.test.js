import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from '../../enzyme';
import ConnectedRatingDisplay, { RatingDisplay } from '../../../containers/articles/RatingDisplay';
import { getRating } from '../../../store/actions/articleActions';
import store from '../../../store/store';


describe('test RatingDisplay component', () => {
    it('should render', () => {
    const wrapper = mount(
     <Provider store={store}>
      <ConnectedRatingDisplay />
     </Provider>);
    expect(wrapper.exists()).toBe(true);
      });
    
    it('renders default stars when provided no props', () => {
    const wrapper = mount(<RatingDisplay getRating={getRating}/>);
    const starBar = wrapper.find('span').at(0)
    expect(starBar.props().style.color).toEqual('#f1f1f1');
    });

    it('1st star renders color', () => {
    const wrapper = mount(<RatingDisplay getRating={getRating}/>);
    wrapper.setProps({ rating: 5 });
    const starBar = wrapper.find('span').at(0)
    expect(starBar.instance().style.color).toEqual('rgb(32, 201, 151)');
    });
});