const initialState = {
  following: [],
  followers: [],
  follow: false,
  unfollow: false,
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
    default:
      return state;
  }
};
export default followingReducer;
