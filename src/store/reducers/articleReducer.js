const initState = {
  articles: [],
  error: [],
  titleError: null,
  descriptionError: null,
  message: '',
  editMessage: '',
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
        titleError: action.error.errors.title,
        descriptionError: action.error.errors.description,
      };
    case 'GET_ARTICLES':
      return state;
    case 'GET_ARTICLES_SUCCESS':
      return action.payload;
    case 'GET_ARTICLES_ERROR':
      return action.error;
    case 'GET_ARTICLE':
      return state;
    case 'GET_ARTICLE_SUCCESSFUL':
      return {
        ...state,
        article: action.payload.article,
        author: action.payload.article.author,
      };
    case 'GET_ARTICLE_FAILED':
      return action.error;
    case 'DELETE_ARTICLE':
      return state;
    case 'DELETE_ARTICLE_SUCCESSFUL':
      return action.payload;
    case 'DELETE_ARTICLE_FAILED':
      return action.error;
    case 'UPDATE_ARTICLE':
      return state;
    case 'UPDATE_ARTICLE_SUCCESSFUL':
      return {
        editMessage: action.response.data,
      };
    case 'UPDATE_ARTICLE_FAILED':
      return {
        ...state,
        error: action.error,
        titleError: action.error.errors.title,
        descriptionError: action.error.errors.description,
      };
    default:
      return state;
  }
};

export default articleReducer;
