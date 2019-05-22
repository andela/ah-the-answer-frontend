const initState = {
  errors: [],
  commentHistory: [],
  messages: null,
};

const commentHistoryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_COMMENT_HISTORY':
      return {
        ...state,
        commentHistory: action.response.comment_history,
      };
    case 'GET_COMMENT_HISTORY_ERROR':
      return {
        ...state,
        errors: action.error,
      };
    default:
      return state;
  }
};

export default commentHistoryReducer;
