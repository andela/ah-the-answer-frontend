import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getCommentHistory } from '../../../store/actions/commentHistoryAction';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const mockData = {
  comment_history: [
    {
      id: 7,
      createdAt: '2019-05-20T15:13:12.005241Z',
      updatedAt: '2019-05-20T15:13:52.457144Z',
      body:
        'If you commented on a video that has been deleted, or if your comment was removed by YouTube for a policy violation, it will not appear in this history.(Edit Two)',
      author_id: 1,
      article_id: 1,
      history_id: 20,
      history_date: '2019-05-20T15:13:52.458841Z',
      history_change_reason: null,
      history_type: '~',
      history_user_id: 1,
    },
    {
      id: 7,
      createdAt: '2019-05-20T15:13:12.005241Z',
      updatedAt: '2019-05-20T15:13:23.424012Z',
      body:
        'If you commented on a video that has been deleted, or if your comment was removed by YouTube for a policy violation, it will not appear in this history.(Edit one)',
      author_id: 1,
      article_id: 1,
      history_id: 19,
      history_date: '2019-05-20T15:13:23.426253Z',
      history_change_reason: null,
      history_type: '~',
      history_user_id: 1,
    },
  ],
};

const error = {
  errors: 'There is no edit history for that comment',
};
describe('Async actions, get comment history', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should get all comment history', () => {
    const test_slug = 'test_slug';
    const id = 12;
    moxios.stubRequest(`/api/articles/${test_slug}/comments/${12}/history/`, {
      status: 200,
      response: mockData,
    });
    const expectedActions = [{ type: 'GET_COMMENT_HISTORY', response: mockData }];
    const store = mockStore({});
    store
      .dispatch(getCommentHistory(test_slug, id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

