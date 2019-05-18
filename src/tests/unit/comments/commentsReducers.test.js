import commentReducer from '../../../store/reducers/commentReducer';

describe('comment reducers', () => {
  it('should return initial state', () => {
    expect(commentReducer(undefined, {})).toEqual({
      errors: [],
      comments: [],
      messages: null,
    });
  });
  it('should handle GET_COMMENTS', () => {
    expect(
      commentReducer(
        {},
        {
          type: 'GET_COMMENTS',
          response: {},
        },
      ),
    ).toEqual({});
  });
  it('should handle GET_COMMENTS_ERROR', () => {
    expect(
      commentReducer(
        {
          errors: [],
          comments: [],
          messages: null,
        },
        {
          type: 'GET_COMMENTS_ERRORS',
          error: {},
        },
      ),
    ).toEqual({
      errors: [],
      comments: [],
      messages: null,
    });
  });
  it('should handle CREATE_COMMENT', () => {
    expect(
      commentReducer(
        {
          errors: [],
          comments: [],
          messages: null,
        },
        {
          type: 'CREATE_COMMENT',
          response: {
            data: {},
          },
        },
      ),
    ).toEqual({
      message: {},
    });
  });

  it('should handle CREATE_COMMENT_ERROR', () => {
    expect(
      commentReducer(
        {
          errors: [],
          comments: [],
          messages: null,
        },
        {
          type: 'CREATE_COMMENT_ERROR',
          error: {},
        },
      ),
    ).toEqual({
      errors: {},
      comments: [],
      messages: null,
    });
  });

  it('should handle EDIT_COMMENT', () => {
    expect(
      commentReducer(
        {
          errors: {},
          comments: [],
          messages: null,
        },
        {
          type: 'EDIT_COMMENT',
          response: {
            data: 'edited test comment',
          },
        },
      ),
    ).toEqual({
      comment: 'edited test comment',
    });
  });
  it('should handle EDIT_COMMENT_ERROR', () => {
    expect(
      commentReducer(
        {
          errors: {},
          comments: [],
          messages: null,
        },
        {
          type: 'EDIT_COMMENT_ERROR',
          error: 'error',
        },
      ),
    ).toEqual({
      errors: {
        type: 'EDIT_COMMENT_ERROR',
        error: 'error',
      },
      comments: [],
      messages: null,
    });
  });
  it('should handle DELETE_COMMENTS', () => {
    expect(
      commentReducer(
        {
          errors: {},
          comments: [],
          messages: null,
        },
        {
          type: 'DELETE_COMMENTS',
          success: {},
        },
      ),
    ).toEqual({
      errors: {},
      comments: [],
      messages: {},
    });
  });
  it('should handle DELETE_COMMENTS_ERROR', () => {
    expect(
      commentReducer(
        {
          errors: {},
          comments: [],
          messages: null,
        },
        {
          type: 'DELETE_COMMENTS_ERROR',
          error: {},
        },
      ),
    ).toEqual({
      errors: {},
      comments: [],
      messages: null,
    });
  });
});
