/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const root = 'https://ah-the-answer-backend-staging.herokuapp.com/api/articles/';

const config = {
  headers: authHeader(),
};

export const getCommentHistory = (slug, id) => (dispatch) => {
  const commentHistoryUrl = `${root}${slug}/comments/${id}/history/`;
  return axios
    .get(commentHistoryUrl, config)
    .then((response) => {
      dispatch({ type: 'GET_COMMENT_HISTORY', response: response.data });
    })
    .catch((error) => {
      dispatch({ type: 'GET_COMMENT_HISTORY_ERROR', error: error.response });
    });
};
