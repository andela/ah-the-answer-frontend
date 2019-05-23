import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { createArticle, getArticle, putRating, postRating } from '../../../store/actions/articleActions';

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

describe('Test the creation of article review', () => {
  it('tests "PUT" of an article rating dispatch', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.put.mockResolvedValue({
      response: {
        data: {},
      },
    });
    const expectedAction = [
      {
        type: 'PUT_RATING',
        ratingValue: 5,
      },
    ];
    return store.dispatch(putRating("slug","userName","review", 5)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests "POST" of an article rating dispatch', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.put.mockResolvedValue({
      response: {
        data: {},
      },
    });
    const expectedAction = [
      {
        type: 'POST_RATING',
        ratingValue: 5,
      },
    ];
    return store.dispatch(postRating("slug","review",5)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

});