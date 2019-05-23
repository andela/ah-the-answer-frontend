import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { getArticles, getRating, checkReviewed } from '../../../store/actions/articleActions';

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

describe('Test "getRating" action creator', () => {
  it('tests correct dispatch is made', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.get.mockResolvedValue({
      data: {
        "Average Rating": 5
      },
    });
    const expectedAction = [
      {
        type: 'GET_RATING',
        articleRating: 5,
      },
    ];
    return store.dispatch(getRating({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('Test "checkReviewed" action creator', () => {
  it('tests correct dispatch for unreviewed article is made', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.get.mockResolvedValue({
      data: {
      "reviews":[{
        "id": 2,
        "rating_value": 1,
        "reviewer_username": "Bob",
        "article": 9,
        "review_body": "",
        "date_created": "2019-05-13T19:58:32.679904Z",
        "date_modified": "2019-05-15T18:53:22.744782Z",
        "reviewed_by": 4
    }]
      },
    });
    const expectedAction = [
      {
        type: 'REVIEW_STATUS',
        isReviewed: false,
        userReview: '',
        ratingValue: 0,
      },
    ];
    return store.dispatch(checkReviewed("John", "article slug")).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests correct dispatch for a reviewed article is made', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.get.mockResolvedValue({
      data: {
      "reviews":[{
        "id": 2,
        "rating_value": 1,
        "reviewer_username": "Bob",
        "article": 9,
        "review_body": "Good article.",
        "date_created": "2019-05-13T19:58:32.679904Z",
        "date_modified": "2019-05-15T18:53:22.744782Z",
        "reviewed_by": 4
    }]
      },
    });
    const expectedAction = [
      {
        type: 'REVIEW_STATUS',
        isReviewed: true,
        userReview: "Good article.",
        ratingValue: 1,
      },
    ];
    return store.dispatch(checkReviewed("Bob", "article slug")).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

});