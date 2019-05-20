import followingReducer from '../../../store/reducers/followReducer';

describe('follow/unfollow reducer', () => {
  it('should return initial state if no action', () => {
    expect(followingReducer(undefined, {})).toEqual({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    });
  });
  it('should handle FOLLOW_USER', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'FOLLOW_USER', payload: true })
    ).toEqual({
      follow: true,
      followings: [],
      followers: [],
      unfollow: false,
      checkfollow: false,
      error: '',
    });
  });
  it('should handle FOLLOW_USER_ERROR', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'FOLLOW_USER_ERROR', error: {} })
    ).toEqual({
      follow: false,
      followings: [],
      followers: [],
      unfollow: false,
      checkfollow: false,
      error: {},
    });
  });
  it('should handle UNFOLLOW_USER', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'UNFOLLOW_USER', payload: true })
    ).toEqual({
      follow: false,
      followings: [],
      followers: [],
      unfollow: true,
      checkfollow: false,
      error: '',
    });
  });
  it('should handle CHECK_FOLLOW_USER', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'CHECK_FOLLOW_USER', payload: true })
    ).toEqual({
      follow: false,
      followings: [],
      followers: [],
      unfollow: false,
      checkfollow: true,
      error: '',
    });
  });
  it('should handle CHECK_FOLLOW_USER_ERROR', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'CHECK_FOLLOW_USER_ERROR', error: {} })
    ).toEqual({
      follow: false,
      followings: [],
      followers: [],
      unfollow: false,
      checkfollow: false,
      error: {},
    });
  });
  it('should handle UNFOLLOW_USER_ERROR', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'UNFOLLOW_USER_ERROR', error: {} })
    ).toEqual({
      follow: false,
      followings: [],
      followers: [],
      unfollow: false,
      checkfollow: false,
      error: {},
    });
  });
  it('should handle GET_FOLLOWERS_SUCCESS', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'GET_FOLLOWERS_SUCCESS', payload: [] })
    ).toEqual({
      follow: false,
      followings: [],
      followers: [],
      unfollow: false,
      checkfollow: false,
      error: '',
    });
  });
  it('should handle GET_FOLLOWERS_ERROR', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'GET_FOLLOWERS_ERROR', error: {} })
    ).toEqual({
      follow: false,
      followings: [],
      followers: [],
      unfollow: false,
      checkfollow: false,
      error: {},
    });
  });
  it('should handle GET_FOLLOWINGS_SUCCESS', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'GET_FOLLOWINGS_SUCCESS', payload: [] })
    ).toEqual({
      follow: false,
      followings: [],
      followers: [],
      unfollow: false,
      checkfollow: false,
      error: '',
    });
  });
  it('should handle GET_FOLLOWINGS_ERROR', () => {
    expect(followingReducer({
      followings: [],
      followers: [],
      follow: false,
      unfollow: false,
      checkfollow: false,
      error: '',
    }, { type: 'GET_FOLLOWINGS_ERROR', error: {} })
    ).toEqual({
      follow: false,
      followings: [],
      followers: [],
      unfollow: false,
      checkfollow: false,
      error: {},
    });
  });
});
