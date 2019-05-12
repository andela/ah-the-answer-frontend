import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { updateArticle } from '../../../store/actions/articleActions';

jest.mock('axios');

describe('Test the updating of an article action', () => {
  it('tests changing article action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.put.mockResolvedValue({
      data: {},
    });
    const expectedAction = [
      {
        type: 'UPDATE_ARTICLE_SUCCESSFUL',
        response: {
          data: {},
        },
      },
    ];
    return store.dispatch(updateArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});