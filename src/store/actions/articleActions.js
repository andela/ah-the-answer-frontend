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

export const getRating = slug => (dispatch) => {
  return axios.get(`${configUrls.root}${slug}/reviews/`)
    .then((response) => {
      // handle success
      dispatch({
        type: 'GET_RATING',
        articleRating: response.data['Average Rating'],
      });
    });
};

export const checkReviewed = (username, slug) => (dispatch) => {
  return axios.get(`${configUrls.root}${slug}/reviews/`)
    .then((response) => {
      // handle success
      const reviewer = response.data.reviews.find((element) => {
        return element.reviewer_username === username;
      });
      if (reviewer === undefined) {
        dispatch({
          type: 'REVIEW_STATUS',
          isReviewed: false,
          userReview: '',
          ratingValue: 0,
        });
      } else {
        dispatch({
          type: 'REVIEW_STATUS',
          isReviewed: true,
          userReview: reviewer.review_body,
          ratingValue: reviewer.rating_value,
        });
      }
    });
};

export const putRating = (slug, userName, review, userRating) => (dispatch) => {
  return axios.put(`${configUrls.root}${slug}/reviews/${userName}`, { review: { review_body: review, rating_value: userRating } }, config)
    .then((response) => {
      // handle success
      dispatch({
        type: 'PUT_RATING',
        ratingValue: userRating,
      });
    });
};

export const postRating = (slug, review, userRating) => (dispatch) => {
  return axios.post(`${configUrls.root}${slug}/reviews/`, { review: { review_body: review, rating_value: userRating } }, config)
    .then((response) => {
      // handle success
      dispatch({
        type: 'POST_RATING',
        ratingValue: userRating,
      });
    });
};

export const bookmarkArticle = (id) => {
  return (dispatch) => {
    const articleUrl = `https://ah-the-answer-backend-staging.herokuapp.com/api/bookmark/${id}/`;
    return axios.post(articleUrl, {}, config)
      .then((response) => {
        dispatch({ type: 'BOOKMARK_ARTICLE_SUCCESSFUL', response });
      })
      .catch((error) => {
        dispatch({ type: 'BOOKMARK_ARTICLE_FAILED', error: error.response.data });
      });
  };
};

export const getBookmarks = () => {
  return (dispatch) => {
    const articleUrl = 'https://ah-the-answer-backend-staging.herokuapp.com/api/bookmarks/';
    return axios.get(articleUrl, config)
      .then((response) => {
        if (response) {
          dispatch({
            type: 'GET_BOOKMARKS_SUCCESS',
            payload: response.data.success,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: 'GET_BOOKMARKS_ERROR', error: error.response.data });
        }
      });
  };
};
