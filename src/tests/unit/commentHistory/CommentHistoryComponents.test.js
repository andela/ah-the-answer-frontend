import React from 'react';
import { mount } from 'enzyme';
import CommentHistory, {
  CommentHistoryList,
} from '../../../containers/commentHistory/CommentHistory';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { mockData } from './CommentHistoryAction.test';
import { getCommentHistory } from '../../../store/actions/commentHistoryAction';
import CommentHistoryDetail from '../../../containers/commentHistory/commentHistoryDetail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Comment History Components', () => {
  const store = mockStore({});
  it('should renders CommentHistory component', () => {
    const props = {
      componentDidMount: jest.fn(),
      getCommentHistory: jest.fn(),
    };
    jest.spyOn(CommentHistoryList.prototype, 'componentDidMount');
    const wrapper = mount(
      <Provider store={store}>
        <CommentHistory {...props} />
      </Provider>,
    );
    expect(CommentHistoryList.prototype.componentDidMount).toBeDefined();
  });
  it('should renders CommentHistoryDetail component', () => {
    const props = {
      user: jest.fn(),
      item: {},
    };

    const wrapper = mount(
      <Provider store={store}>
        <CommentHistoryDetail {...props} />
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
