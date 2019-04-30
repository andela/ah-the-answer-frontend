const createArticle = (article) => {
  return (dispatch, getState) => {
    // make async call to database
    dispatch({ type: 'CREATE_ARTICLE', article });
  };
};

export default createArticle;
