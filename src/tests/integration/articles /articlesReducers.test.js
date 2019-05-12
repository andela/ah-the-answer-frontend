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
});
