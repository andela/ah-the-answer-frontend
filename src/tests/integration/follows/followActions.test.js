import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { follow, checkFollow, unFollow, getFollowers, getFollowings } from '../../../store/actions/followActions';

jest.mock('axios');

describe('Test successful follow actions', () => {
  it('tests post follow user action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.post.mockResolvedValue({
      data: {},
    });
    const expectedAction = [
      {
        type: 'FOLLOW_USER',
        payload: true,
      },
    ];
    return store.dispatch(follow({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('tests unfollow user action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.delete.mockResolvedValue({
      data: {},
    });
    const expectedAction = [
      {
        type: 'UNFOLLOW_USER',
        payload: true,
      },
    ];
    return store.dispatch(unFollow({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('tests retrieve followers action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.get.mockResolvedValue({
      data: {
        followers: [],
      },
    });
    const expectedAction = [
      {
        type: 'GET_FOLLOWERS_SUCCESS',
        payload: [],
      },
    ];
    return store.dispatch(getFollowers()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('tests retrieve users you follow action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.get.mockResolvedValue({
      data: {
        followed_users: [],
      },
    });
    const expectedAction = [
      {
        type: 'GET_FOLLOWINGS_SUCCESS',
        payload: [],
      },
    ];
    return store.dispatch(getFollowings()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('tests check follow user action', () => {
    const testStore = configureMockStore([thunk]);
    let store = testStore({});
    mockAxios.post.mockResolvedValue({
      data: {
        success: true,
      },
    });
    const expectedAction = [
      {
        type: 'CHECK_FOLLOW_USER',
        payload: true,
      },
    ];
    return store.dispatch(checkFollow({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});