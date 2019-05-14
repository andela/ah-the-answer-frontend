import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { fetchFollows, fetchFollowers, fetchBio, fetchName, updateProfile } from '../../../store/actions/profileActions';

jest.mock('axios');

describe('Test profile action creators', () => {
  it('tests fetch user follows', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    mockAxios.get.mockResolvedValue({
      data: {
        success: [
          {
            follows: 120,
          },
        ],
      },
    });
    const expectedAction = [
      {
        type: 'profile/FETCH_FOLLOWS',
        followCount: 120,
      },
    ];
    return store.dispatch(fetchFollows()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests fetch user followers', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    mockAxios.get.mockResolvedValue({
      data: {
        success: [
          {
            follows: 120,
          },
          {
            followers: 100,
          },
        ],
      },
    });
    const expectedAction = [
      {
        type: 'profile/FETCH_FOLLOWERS',
        followerCount: 100,
      },
    ];
    return store.dispatch(fetchFollowers()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests fetch user followers', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    mockAxios.get.mockResolvedValue({
      data: {
        success: [
          {
            follows: 120,
          },
          {
            followers: 100,
          },
        ],
      },
    });
    const expectedAction = [
      {
        type: 'profile/FETCH_FOLLOWERS',
        followerCount: 100,
      },
    ];
    return store.dispatch(fetchFollowers()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests fetch user followers', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    mockAxios.get.mockResolvedValue({
      data: {
        success: [
          {
            follows: 120,
          },
          {
            followers: 100,
          },
        ],
      },
    });
    const expectedAction = [
      {
        type: 'profile/FETCH_FOLLOWERS',
        followerCount: 100,
      },
    ];
    return store.dispatch(fetchFollowers()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests fetch user bio', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    mockAxios.get.mockResolvedValue({
      data: {
        profile:
          {
            user_bio: 'Life Summary',
          },
      },
    });
    const expectedAction = [
      {
        type: 'profile/FETCH_BIO',
        userBio: 'Life Summary',
      },
    ];
    return store.dispatch(fetchBio()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests fetch userName and givenName', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    mockAxios.get.mockResolvedValue({
      data: {
        profile:
          {
            name: 'John',
            username: 'Batman',
          },
      },
    });
    const expectedAction = [
      {
        type: 'profile/FETCH_NAME',
        givenName: 'John',
        userName: 'Batman',
      },
    ];
    return store.dispatch(fetchName()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests fetch userProfile', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    mockAxios.put.mockResolvedValue({
      data: {
        success:
          'Profile Updated',
      },
    });
    const expectedAction = [
      {
        type: 'profile/UPDATE_PROFILE',
        updateMessage: 'Profile Updated',
      },
    ];
    return store.dispatch(updateProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });


});
