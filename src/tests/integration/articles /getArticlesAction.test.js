import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { getArticles } from '../../../store/actions/articleActions';

jest.mock('axios');

describe('Test getting all articles', () => {
  it('tests retrieval of all articles actions', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.get.mockResolvedValue({
      data: {},
    });
    const expectedAction = [
      {
        type: 'GET_ARTICLES_SUCCESS',
        payload: {},
      },
    ];
    return store.dispatch(getArticles({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});