const initialState = {
  followings: [],
  followers: [],
  follow: false,
  unfollow: false,
  checkfollow: false,
  error: '',
};
const followingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FOLLOW_USER':
      return { ...state, follow: action.payload };
    case 'FOLLOW_USER_ERROR':
      return { ...state, error: action.error };
    case 'UNFOLLOW_USER':
      return { ...state, unfollow: action.payload };
    case 'UNFOLLOW_USER_ERROR':
      return { ...state, error: action.error };
    case 'GET_FOLLOWERS_SUCCESS':
      return { ...state, followers: action.payload };
    case 'GET_FOLLOWERS_ERROR':
      return { ...state, error: action.error };
    case 'GET_FOLLOWINGS_SUCCESS':
      return { ...state, followings: action.payload };
    case 'GET_FOLLOWINGS_ERROR':
      return { ...state, error: action.error };
    case 'CHECK_FOLLOW_USER':
      return { ...state, checkfollow: action.payload };
    case 'CHECK_FOLLOW_USER_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};
export default followingReducer;
