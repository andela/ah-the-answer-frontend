import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const configUrls = {
  root: 'http://127.0.0.1:8000/api/articles/',
};
const token = '';
const config = {
  headers: {'Authorization': "Bearer " + token}
};

export const createArticle = (article) => {
  return (dispatch) => {
    axios.post(configUrls.root,
      { article },
      config)
      .then((response) => {
        dispatch({ type: 'CREATE_ARTICLE', response });
      })
      .catch((error) => {
        dispatch({ type: 'CREATE_ARTICLE_ERROR', error });
      });
  };
};

export const getArticles = () => {
  return (dispatch) => {
    dispatch({ type: 'GET_ARTICLES' });
    axios.get(`${configUrls.root}?limit=15`)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'GET_ARTICLES_SUCCESS',
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: 'GET_ARTICLES_ERROR', payload: error.response.data });
        }
      });
  };
};

export const getArticle = (slug) => {
  return (dispatch) => {
    dispatch({ type: 'GET_ARTICLE' });
    const articleUrl = `http://127.0.0.1:8000/api/articles/${slug}/`;
    axios.get(articleUrl)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'GET_ARTICLE_SUCCESSFUL',
            payload: response.data,
          });
        }
      }).catch((err) => {
        if (err.response) {
          dispatch({ type: 'GET_ARTICLE_FAILED', payload: err.response.data });
        }
      });
  };
};

export const deleteArticle = (slug) => {
  return (dispatch) => {
    dispatch({ type: 'DELETE_ARTICLE' });
    const articleUrl = `http://127.0.0.1:8000/api/articles/${slug}/`;
    axios.delete(articleUrl, config)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'DELETE_ARTICLE_SUCCESSFUL',
            payload: response.data,
          });
        }
      }).catch((err) => {
        if (err.response) {
          dispatch({ type: 'DELETE_ARTICLE_FAILED', payload: err.response.data });
        }
      });
  };
};

export const updateArticle = (slug, article) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_ARTICLE' });
    const articleUrl = `http://127.0.0.1:8000/api/articles/${slug}/`;
    axios.put(articleUrl,
      { article },
      config)
      .then((response) => {
        dispatch({ type: 'UPDATE_ARTICLE_SUCCESSFUL', response });
      })
      .catch((error) => {
        dispatch({ type: 'UPDATE_ARTICLE_FAILED', error });
      });
  };
};
