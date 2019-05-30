import React from 'react';

import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import Axios from 'axios';
import { mount, shallow } from "../../enzyme";
import { LikingArticle }  from '../../../containers/articles/LikingArticle';

const mockStore = configureStore([thunk]);
const initialState = {};
const props = {
  slug : 'article-slug-12343',
};
const likeUrl = process.env.REACT_APP_API;
const store = mockStore(initialState);

describe('Liking article component', () => {
  it('renders the component', ()=> {
    const wrapper = mount(
      <LikingArticle {...props} />
    );
    expect(wrapper.exists()).toBe(true);
  });
  it('mounts', () => {
    const wrapper = mount(
        <LikingArticle {...props} />
    );
    const spy = jest.spyOn(wrapper.instance(), 'getLiked');
    wrapper.instance().getLiked();
    expect(spy).toBeCalled();
  });
  it('calls the backend and updates the state',() => {
    const wrapper = shallow(
        <LikingArticle {...props} />
    );
    const mock = new MockAdapter(Axios);
    const state =  wrapper.instance().state;

    mock.onPost(`${likeUrl}/api/articles/${props.slug}/like/`,)
      .reply(200,{});
    mock.onGet(`${likeUrl}/api/articles/${props.slug}/liked/`,)
      .reply(200,{
          message: 'You have reacted to this article before',
          liked: [{
            likes: 1
          }],
      });
    wrapper.instance().getLiked();
    const click = wrapper.find('#like');
    click.simulate('click');
    expect(state.loggedIn).toEqual(true);
  });
  it('calls the backend and updates the state if already disliked',() => {
    const wrapper = shallow(
        <LikingArticle {...props} />
    );
    const mock = new MockAdapter(Axios);
    const state =  wrapper.instance().state;

    mock.onPost(`${likeUrl}/api/articles/${props.slug}/like/`,)
      .reply(200,{});
    mock.onGet(`${likeUrl}/api/articles/${props.slug}/liked/`,)
      .reply(200,{
          message: 'You have reacted to this article before',
          liked: [{
            likes: 0
          }],
      });
    wrapper.instance().getLiked();
    const click = wrapper.find('#like');
    click.simulate('click');
    expect(state.loggedIn).toEqual(true);
  });
  it('changes the state when a user is not logged in ',() => {
    const wrapper = shallow(
      <LikingArticle {...props} />
    );

    const mock = new MockAdapter(Axios);
    mock.onPost(`${likeUrl}/api/articles/${props.slug}/dislike/`)
      .reply(204);
    wrapper.instance().setState = jest.fn();
    wrapper.update();
    wrapper.instance().likeArticle(-1);

    expect( wrapper.instance().setState).toBeTruthy();
  });

  it('calls the likeArticle on like',() => {
    const wrapper = shallow(
      <LikingArticle {...props} />
    );
    const spy = jest.spyOn(wrapper.instance(), 'likeArticle');
    const click = wrapper.find('#like');
    click.simulate('click');
    expect(spy).toBeCalled();
  });
  it('calls the likeArticle on dislike',() => {
    const wrapper = shallow(
      <LikingArticle {...props} />
    );
    const spy = jest.spyOn(wrapper.instance(), 'likeArticle');
    const click = wrapper.find('#dislike');
    click.simulate('click');
    expect(spy).toBeCalled();
  })
});
