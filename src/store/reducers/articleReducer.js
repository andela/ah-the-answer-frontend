const initState = {
  articles: [],
  error: {},
  message: {},
  editMessage: {},
  deleteMessage: {},
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ARTICLE':
      return {
        message: action.response.data,
      };
    case 'CREATE_ARTICLE_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'GET_ARTICLES_SUCCESS':
      return action.payload;
    case 'GET_ARTICLES_ERROR':
      return action.error;
    case 'GET_ARTICLE_SUCCESSFUL':
      return {
        ...state,
        article: action.payload.article,
        author: action.payload.article.author,
      };
    case 'GET_ARTICLE_FAILED':
      return action.error;
    case 'DELETE_ARTICLE_SUCCESSFUL':
      return {
        deleteMessage: action.payload,
      };
    case 'DELETE_ARTICLE_FAILED':
      return action.error;
    case 'UPDATE_ARTICLE_SUCCESSFUL':
      return {
        article: action.response.data.article,
        editMessage: action.response.data,
      };
    case 'UPDATE_ARTICLE_FAILED':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default articleReducer;
