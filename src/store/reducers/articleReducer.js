const initState = {
  articles: [],
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ARTICLE':
      return action.response;
    case 'CREATE_ARTICLE_ERROR':
      return action.error;
    case 'GET_ARTICLES':
      return state;
    case 'GET_ARTICLES_SUCCESS':
      return action.payload;
    case 'GET_ARTICLES_ERROR':
      return action.payload;
    case 'GET_ARTICLE':
      return state;
    case 'GET_ARTICLE_SUCCESSFUL':
      const article = action.payload.article;
      return {
        ...state,
        article,
        author: article.author,
      };
    case 'GET_ARTICLE_FAILED':
      return state;
    case 'DELETE_ARTICLE':
      return state;
    case 'DELETE_ARTICLE_SUCCESSFUL':
      return state;
    case 'DELETE_ARTICLE_FAILED':
      return state;
    case 'UPDATE_ARTICLE':
      return state;
    case 'UPDATE_ARTICLE_SUCCESSFUL':
      return state;
    case 'UPDATE_ARTICLE_FAILED':
      return state;
    default:
      return state;
  }
};

export default articleReducer;
