import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { createArticle, getArticle } from '../../../store/actions/articleActions';

jest.mock('axios');

describe('Test the creating of an article post', () => {
  it('tests post new article action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.post.mockResolvedValue({
      data: {},
    });
    const expectedAction = [
      {
        type: 'CREATE_ARTICLE',
        response: {
          data: {},
        },
      },
    ];
    return store.dispatch(createArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('tests get article', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.get.mockResolvedValue({
      response: {
        data: {},
      },
    });
    const expectedAction = [
      {
        type: 'GET_ARTICLE_SUCCESSFUL',
        payload: undefined,
      },
    ];
    return store.dispatch(getArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});