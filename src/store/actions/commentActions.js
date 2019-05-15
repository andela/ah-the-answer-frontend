/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import axios from 'axios';
import authHeader from '../../helpers/authHeader';
import store from '../store';

const root = 'https://ah-the-answer-backend-staging.herokuapp.com/api/articles/';

const config = {
  headers: authHeader(),
};

export const getComments = slug => (dispatch) => {
  const comment_url = `${root}${slug}/comments/`;
  return axios
    .get(comment_url, config)
    .then((response) => {
      dispatch({ type: 'GET_COMMENTS', response: response.data });
    })
    .catch((error) => {
      dispatch({ type: 'GET_COMMENTS_ERROR', error: error.response });
    });
};

export const createComment = (slug, comment) => (dispatch) => {
  const comment_url = `${root}${slug}/comments/`;
  return axios
    .post(comment_url, { comment }, config)
    .then((response) => {
      dispatch({ type: 'CREATE_COMMENT', response });
      store.dispatch(getComments(slug));
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_COMMENT_ERROR', error: error.response.data });
    });
};

export const deleteComment = (slug, id) => (dispatch) => {
  const comment_url = `${root}${slug}/comments/${id}`;
  return axios
    .delete(comment_url, config)
    .then((response) => {
      if (response) {
        dispatch({
          type: 'DELETE_COMMENT_SUCCESSFUL',
          payload: response.data,
        });
        store.dispatch(getComments(slug));
      }
    })
    .catch((error) => {
      if (error.response) {
        dispatch({ type: 'DELETE_COMMENT_FAILED', error: error.response.data });
      }
    });
};

export const editComment = (slug, id, editedComment) => (dispatch) => {
  const comment_url = `${root}${slug}/comments/${id}/`;
  return axios
    .put(
      comment_url,
      {
        comment: editedComment,
      },
      config,
    )
    .then((response) => {
      dispatch({ type: 'EDIT_COMMENT', response });
      store.dispatch(getComments(slug));
    })
    .catch((error) => {
      dispatch({ type: 'EDIT_COMMENT_ERROR', error: error.response.data });
    });
};
