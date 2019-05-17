import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import CreateComments from '../../../containers/comments/CreateComments';

import store from '../../../store/store';
import { getComments } from '../../../store/actions/commentActions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ReactDOM from 'react-dom';
import { CommentDetail } from '../../../containers/comments/CommentDetail';
import CommentList from '../../../containers/comments/CommentList';

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
    let store = testStore();
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
        body: 'body',
      },
    };
    let store = testStore({});
    ReactDOM.render(
      <Provider store={store}>
        <CommentDetail {...props} />
      </Provider>,
      test_div,
    );
    ReactDOM.unmountComponentAtNode(test_div);
  });
  it('should render CommentList component', () => {
    spyOn(console, 'error');
    const test_div = document.createElement('div');
    const testStore = configureMockStore([thunk]);
    const props = {
      item: {
        body: 'body',
      },
    };
    let store = testStore({});
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
        body: 'body',
      },
    };
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    const wrapper = mount(<CommentDetail {...props} />);
    wrapper.instance().handleSubmit({ preventDefault: () => {} });
    wrapper.instance().handleDelete();
    wrapper.instance().handleOpen();
  });
});
