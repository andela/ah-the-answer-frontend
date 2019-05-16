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
    
    it('renders a given "rating" state value', () => {
    const wrapper = mount(<RatingDisplay getRating={getRating}/>);
    wrapper.setProps({ rating: 5 });
    const text = wrapper.find('p').text();
    expect(text).toEqual('Rated: 5');
    });

});