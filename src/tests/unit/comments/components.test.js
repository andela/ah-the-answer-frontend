import React from 'react';
import { create } from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ReactDOM from 'react-dom';
import CreateComments from '../../../containers/comments/CreateComments';

import store from '../../../store/store';
import { getComments } from '../../../store/actions/commentActions';
import { CommentDetail } from '../../../containers/comments/CommentDetail';
import CommentList from '../../../containers/comments/CommentList';
import CommentLikes from '../../../containers/comments/CommentLikes';
import axios from 'axios'; 
jest.mock('axios');



describe('Render Create Components', () => {
  test('should be able to render CreateComponent component', () => {
    const testComponent = create(
      <Provider store={store}>
        <CreateComments />
      </Provider>,
    );
    expect(testComponent.toJSON()).toMatchSnapshot();
  });
  test('should be able to check initial state', () => {
    const testComponent = create(
      <Provider store={store}>
        <CreateComments />
      </Provider>,
    );
    const instance = testComponent.getInstance();
    expect(instance.previousState.comments.comments.length).toBe(0);
  });
});

describe('Component Render', () => {
  it('should render CreateComments component', () => {
    const test_div = document.createElement('div');
    const testStore = configureMockStore([thunk]);
    const store = testStore();
    ReactDOM.render(
      <Provider store={store}>
        <CreateComments />
      </Provider>,
      test_div,
    );
    ReactDOM.unmountComponentAtNode(test_div);
  });
  it('should render CommentDetail component', () => {
    spyOn(console, 'error');
    const test_div = document.createElement('div');
    const testStore = configureMockStore([thunk]);
    const props = {
      item: {
        author: { username: 'username' },
      },
    };
    const store = testStore({});
    ReactDOM.render(
      <Provider store={store}>
        <CommentDetail {...props} />
      </Provider>,
      test_div,
    );
    ReactDOM.unmountComponentAtNode(test_div);
  });
  it('should render CommentList component', () => {
    const getResp = { data : {"likes": 10 } };
    axios.get.mockImplementation(() => Promise.resolve(getResp));
    
    spyOn(console, 'error');
    const test_div = document.createElement('div');
    const testStore = configureMockStore([thunk]);
    const props = {
      item: {
        body: 'body',
      },
    };
    const store = testStore({});
    ReactDOM.render(
      <Provider store={store}>
        <CommentList {...props} />
      </Provider>,
      test_div,
    );
    ReactDOM.unmountComponentAtNode(test_div);
  });
});

describe('Handle Submit', () => {
  it('should be able to handle form submit', () => {
    spyOn(console, 'error');
    const props = {
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      preventDefault: jest.fn(),
      editComment: jest.fn(),
      deleteComment: jest.fn(),
      item: {
        author: { username: 'username' },

      },
    };
    const testStore = configureMockStore([thunk]);
    const store = testStore({});
    const wrapper = mount(<CommentDetail {...props} />);
    wrapper.instance().handleSubmit({ preventDefault: () => {} });
    wrapper.instance().handleDelete();
    wrapper.instance().handleOpen();
  });
});

describe('Tests "CommentLike" Component', () => {
  it('should render', () => {
    const wrapper = mount(<CommentLikes />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should display a given number of likes', () => {
    const wrapper = mount(<CommentLikes />);
    wrapper.setState({ likes: 50 });
    const likes = wrapper.find('p').text()
    expect(likes).toEqual("50");  
  });

  it('should trigger "likeComment" method when clicking unliked comment', () => {
    const postResp = { data : {"message": "You liked comment: 1" } };
    const getResp = { data : {"likes": 0 } };
    axios.post.mockImplementation(() => Promise.resolve(postResp));
    axios.get.mockImplementation(() => Promise.resolve(getResp));

    const wrapper = shallow(<CommentLikes commentID={1}/>);
    const spy = jest.spyOn(wrapper.instance(), "likeComment")
    const thumb = wrapper.find('#like');
    thumb.simulate('click');
    console.log(wrapper.instance())
    expect(spy).toBeCalled()
  });

  it('should trigger "likeComment" method when clicking liked comment', () => {
    const postResp = { data : {"message": "Your like has been reverted for comment: 1" } };
    const getResp = { data : {"likes": 0 } };
    axios.post.mockImplementation(() => Promise.resolve(postResp));
    axios.get.mockImplementation(() => Promise.resolve(getResp));

    const wrapper = shallow(<CommentLikes commentID={1}/>);
    const spy = jest.spyOn(wrapper.instance(), "likeComment")
    const thumb = wrapper.find('#like');
    thumb.simulate('click');
    console.log(wrapper.instance())
    expect(spy).toBeCalled()
  });


});
