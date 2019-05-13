const initState = {
  auth: [],
  is_authenticated: false,
  authError: null,
  errorMessages: null,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER_SIGN_IN':
      localStorage.setItem('user', JSON.stringify(action.response.data.user));
      return {
        ...state,
        auth: action.response.data.user,
        is_authenticated: true,
      };
    case 'USER_SIGN_IN_ERROR':
      return {
        ...state,
        authError: action.err.response.data.errors.error[0],
      };
    case '404_ERROR':
      return {
        ...state,
        errorMessages: action.err.message,

      };
    default:
      return state;
  }
};

export default authReducer;
