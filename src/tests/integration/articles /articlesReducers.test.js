import articleReducer from '../../../store/reducers/articleReducer';

describe('articles reducer', () => {
  it('should return initial state if no action', () => {
    expect(articleReducer(undefined, {})).toEqual({
      articles: [],
      error: {},
      message: {},
      editMessage: {},
      deleteMessage: {},
      rating: 0,
      ratingValue: 0,
      userReview: '',
      isReviewed: false,
      bookmarkMessage: {},
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
  it('should handle BOOKMARK_ARTICLE_SUCCESSFUL', () => {
    expect(articleReducer({
      bookmarkMessage: {},
    }, {
      type: 'BOOKMARK_ARTICLE_SUCCESSFUL',
      response: {
        data: {
          bookmarks: 'here',
        },
      },
    })).toEqual({
      bookmarkMessage: {
        bookmarks: 'here',
      },  
    });
  });
  it('should handle BOOKMARK_ARTICLE_FAILED', () => {
    expect(articleReducer({
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      bookmarkMessage: {},
    }, {
      type: 'BOOKMARK_ARTICLE_FAILED',
      error: {},
    })).toEqual({
      articles: [],
      error: {},
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      bookmarkMessage: {}, 
    });
  });
  it('should handle GET_BOOKMARKS_SUCCESS', () => {
    expect(articleReducer({
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      bookmarkMessage: {},
      bookmarks: {},
    }, {
      type: 'GET_BOOKMARKS_SUCCESS',
      payload: {},
    })).toEqual({
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      bookmarkMessage: {},
      bookmarks: {},
    });
  });
  it('should handle GET_BOOKMARKS_ERROR', () => {
    expect(articleReducer({
      articles: [],
      error: {},
      message: {},
      editMessage: {},
      deleteMessage: {},
      bookmarkMessage: {},
    }, {
      type: 'GET_BOOKMARKS_ERROR',
      error: {},
    }
    )).toEqual({
      articles: [],
      error: {},
      message: {},
      editMessage: {},
      deleteMessage: {},
      bookmarkMessage: {},      
    });
  });

  it('should handle GET_RATING', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      rating: 0,
    }, {
      type: 'GET_RATING',
      articleRating: 5,
    })).toEqual({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      rating: 5,
    });
  });

  it('should handle REVIEW_STATUS for an unreviewed article', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      ratingValue: 0,
      userReview: '',
      isReviewed: false,
    }, {
      type: 'REVIEW_STATUS',
      isReviewed: false,
      userReview: '',
      ratingValue: 0,
    })).toEqual({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      ratingValue: 0,
      userReview: '',
      isReviewed: false,
    });
  });

  it('should handle REVIEW_STATUS for a reviewed article', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      ratingValue: 0,
      userReview: '',
      isReviewed: false,
    }, {
      type: 'REVIEW_STATUS',
      isReviewed: true,
      userReview: 'Reviewed',
      ratingValue: 5,
    })).toEqual({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      isReviewed: true,
      userReview: 'Reviewed',
      ratingValue: 5,
    });
  });

  it('should handle PUT_RATING for a reviewed article', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      ratingValue: 0,
    }, {
      type: 'PUT_RATING',
      ratingValue: 5
    })).toEqual({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      ratingValue: 5,
    });
  });

  it('should handle POST_RATING for a reviewed article', () => {
    expect(articleReducer({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      ratingValue: 0,
    }, {
      type: 'POST_RATING',
      ratingValue: 5
    })).toEqual({
      article: {},
      articles: [],
      errors: [],
      message: {},
      editMessage: {},
      deleteMessage: {},
      ratingValue: 5,
    });
  });

});
