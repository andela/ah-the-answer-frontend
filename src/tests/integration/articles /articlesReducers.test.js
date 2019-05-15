import articleReducer from '../../../store/reducers/articleReducer';

describe('articles reducer', () => {
  it('should return initial state if no action', () => {
    expect(articleReducer(undefined, {})).toEqual({
      articles: [],
      error: {},
      message: {},
      editMessage: {},
      deleteMessage: {},
    });
  });
  it('should handle GET_ARTICLE', () => {
    expect(articleReducer({
      article: {
        data: 'here',
      },
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'GET_ARTICLE_SUCCESSFUL',
      payload: {
        article: {
          author: 'test',
        },
      },
    })).toEqual({
      article: {
        author: "test",
      },
      articles: [],
      author: 'test',
      message: {},
      errors: [],
      editMessage: {},
      deleteMessage: {},
    });
  });
  it('should handle GET_ARTICLE_FAIL', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'GET_ARTICLE_FAILED',
      error: {},
    })).toEqual({});
  });
  it('should handle GET_ARTICLES_SUCCESS', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'GET_ARTICLES_SUCCESS',
      payload: {},
    })).toEqual({});
  });
  it('should handle GET_ARTICLES_ERROR', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'GET_ARTICLES_ERROR',
      error: {},
    }
    )).toEqual({});
  });
  it('should handle CREATE_ARTICLE', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'CREATE_ARTICLE',
      response: {
        data: {},
      },
    })).toEqual({
      message: {},
    });
  });
  it('should handle CREATE_ARTICLE_ERROR', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'CREATE_ARTICLE_ERROR',
      error: {},
    })).toEqual({
      articles: [],
      article: {},
      error: {},
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},     
    });
  });
  it('should handle DELETE_ARTICLE_FAILED', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'DELETE_ARTICLE_FAILED',
      error: {},
    })).toEqual({});
  });
  it('should handle DELETE_ARTICLE_SUCCESSFUL', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'DELETE_ARTICLE_SUCCESSFUL',
      payload: {},
    })).toEqual({
      deleteMessage: {},
    });
  });
  it('should handle UPDATE_ARTICLE_SUCCESSFUL', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'UPDATE_ARTICLE_SUCCESSFUL',
      response: {
        data: {
          article: 'here',
        },
      },
    })).toEqual({
      article: 'here',
      editMessage: {
        article: 'here',
      },  
    });
  });
  it('should handle UPDATE_ARTICLE_FAILED', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
    }, {
      type: 'UPDATE_ARTICLE_FAILED',
      error: {},
    })).toEqual({
      articles: [],
      article: {},
      error: {},
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},  
    });
  });

});