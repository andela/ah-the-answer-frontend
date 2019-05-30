import commentHistoryReducer from '../../../store/reducers/commentHistoryReducer';

describe('commentHistory reducers', () => {
  it('should return initial state', () => {
    expect(commentHistoryReducer(undefined, {})).toEqual({
      errors: [],
      commentHistory: [],
      messages: null,
    });
  });
  it('should handle GET_COMMENT_HISTORY', () => {
    expect(
      commentHistoryReducer(
        {},
        {
          type: 'GET_COMMENT_HISTORY',
          response: {},
        },
      ),
    ).toEqual({});
  });
  it('should handle GET_COMMENT_HISTORY_ERROR', () => {
    expect(
      commentHistoryReducer(
        {
          errors: [],
          commentHistory: [],
          messages: null,
        },
        {
          type: 'GET_COMMENT_HISTORY_ERROR',
          error: [],
        },
      ),
    ).toEqual({
      errors: [],
      commentHistory: [],
      messages: null,
    });
  });
});
