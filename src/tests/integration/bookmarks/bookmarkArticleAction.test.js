import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { bookmarkArticle } from '../../../store/actions/articleActions';

jest.mock('axios');

describe('Test the creating of an article bookmark', () => {
  it('tests post new bookmark action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.post.mockResolvedValue({
      data: {},
    });
    const expectedAction = [
      {
        type: 'BOOKMARK_ARTICLE_SUCCESSFUL',
        response: {
          data: {},
        },
      },
    ];
    return store.dispatch(bookmarkArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
