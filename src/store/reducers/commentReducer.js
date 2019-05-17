const initState = {
  errors: [],
  comments: [],
  messages: null,
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_COMMENT':
      return {
        message: action.response.data,
      };
    case 'CREATE_COMMENT_ERROR':
      return {
        ...state,
        errors: action.error,
      };
    case 'EDIT_COMMENT':
      return {
        comment: action.response.data,
      };
    case 'EDIT_COMMENT_ERROR':
      return {
        ...state,
        errors: action,
      };
    case 'GET_COMMENTS':
      return {
        ...state,
        comments: action.response.comments,
      };
    case 'GET_COMMENTS_ERROR':
      return {
        ...state,
        errors: action.error,
      };
    case 'DELETE_COMMENTS':
      return {
        ...state,
        messages: action.success,
      };
    case 'DELETE_COMMENTS_ERROR':
      return {
        ...state,
        errors: action.error,
      };
    default:
      return state;
  }
};

export default commentReducer;
