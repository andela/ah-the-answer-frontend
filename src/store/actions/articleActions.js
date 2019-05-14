import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const configUrls = {
  root: 'https://ah-the-answer-backend-staging.herokuapp.com/api/articles/',
};

const config = {
  headers: authHeader(),
};

export const createArticle = (article) => {
  return (dispatch) => {
    return axios.post(configUrls.root,
      { article },
      config)
      .then((response) => {
        dispatch({ type: 'CREATE_ARTICLE', response });
      })
      .catch((error) => {
        dispatch({ type: 'CREATE_ARTICLE_ERROR', error: error.response.data });
      });
  };
};

export const getArticles = () => {
  return (dispatch) => {
    return axios.get(`${configUrls.root}?limit=15`)
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
          dispatch({ type: 'GET_ARTICLES_ERROR', error: error.response.data });
        }
      });
  };
};

export const getArticle = (slug) => {
  return (dispatch) => {
    const articleUrl = `${configUrls.root}${slug}/`;
    return axios.get(articleUrl)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'GET_ARTICLE_SUCCESSFUL',
            payload: response.data,
          });
        }
      }).catch((error) => {
        if (error.response) {
          dispatch({ type: 'GET_ARTICLE_FAILED', error: error.response.data });
        }
      });
  };
};

export const deleteArticle = (slug) => {
  return (dispatch) => {
    const articleUrl = `${configUrls.root}${slug}/`;
    return axios.delete(articleUrl, config)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'DELETE_ARTICLE_SUCCESSFUL',
            payload: response.data,
          });
        }
      }).catch((error) => {
        if (error.response) {
          dispatch({ type: 'DELETE_ARTICLE_FAILED', error: error.response.data });
        }
      });
  };
};

export const updateArticle = (slug, article) => {
  return (dispatch) => {
    const articleUrl = `${configUrls.root}${slug}/`;
    return axios.put(articleUrl,
      { article },
      config)
      .then((response) => {
        dispatch({ type: 'UPDATE_ARTICLE_SUCCESSFUL', response });
      })
      .catch((error) => {
        dispatch({ type: 'UPDATE_ARTICLE_FAILED', error: error.response.data });
      });
  };
};

export const getRating = () => (dispatch) => {
  return axios.get('http://127.0.0.1:8000/api/articles/fallout-weekly-a835e186fdfa/reviews/')
    .then((response) => {
      // handle success
      dispatch({
        type: 'GET_RATING',
        articleRating: response.data['Average Rating'],
      });
    })
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
};

export const checkReviewed = username => (dispatch) => {
  return axios.get('http://127.0.0.1:8000/api/articles/fallout-weekly-a835e186fdfa/reviews/')
    .then((response) => {
      // handle success
      const reviewer = response.data.reviews.find((element) => {
        return element.reviewer_username === username;
      });
      //console.log(reviewer);
      if (reviewer === undefined) {
        dispatch({
          type: 'REVIEW_STATUS',
          isReviewed: false,
          userReview: '',
        });
      } else {
        console.log(reviewer);
        dispatch({
          type: ProfileAction.REVIEW_STATUS,
          isReviewed: true,
          userReview: reviewer.review_body,
        });
      }
    })
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
};
