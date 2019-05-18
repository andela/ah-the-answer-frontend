import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { getBookmarks } from '../../../store/actions/articleActions';

jest.mock('axios');

describe('Test getting all bookmarks', () => {
  it('tests retrieval of all bookmarks success action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.get.mockResolvedValue({
      data: {},
    });
    const expectedAction = [
      {
        type: 'GET_BOOKMARKS_SUCCESS',
        payload: undefined,
      },
    ];
    return store.dispatch(getBookmarks({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
