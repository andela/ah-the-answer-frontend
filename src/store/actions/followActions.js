import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const configUrls = {
  root: 'https://ah-the-answer-backend-staging.herokuapp.com/api',
};

const config = {
  headers: authHeader(),
};

export const follow = (userName) => {
  return (dispatch) => {
    return axios.post(
      `${configUrls.root}/follow/${userName}/`,
      {},
      config,
    )
      .then((response) => {
        if (response) {
          dispatch({ type: 'FOLLOW_USER', payload: true });
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({ type: 'FOLLOW_USER_ERROR', error });
        }
      });
  };
};

export const checkFollow = (userName) => {
  return (dispatch) => {
    return axios.post(
      `${configUrls.root}/checkfollow/${userName}/`,
      {},
      config,
    )
      .then((response) => {
        if (response) {
          dispatch({ type: 'CHECK_FOLLOW_USER', payload: response.data.success });
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({ type: 'CHECK_FOLLOW_USER_ERROR', error });
        }
      });
  };
};

export const unFollow = (userName) => {
  return (dispatch) => {
    return axios.delete(
      `${configUrls.root}/unfollow/${userName}`,
      config,
    )
      .then((response) => {
        if (response) {
          dispatch({ type: 'UNFOLLOW_USER', payload: true });
        }
      })
      .catch((error) => {
        dispatch({ type: 'UNFOLLOW_USER_ERROR', error: error.response.data });
      });
  };
};

export const getFollowers = () => {
  return (dispatch) => {
    return axios.get(
      `${configUrls.root}/followers/`,
      config,
    )
      .then((response) => {
        if (response) {
          dispatch({
            type: 'GET_FOLLOWERS_SUCCESS',
            payload: response.data.followers,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: 'GET_FOLLOWERS_ERROR', error: error.response.data });
        }
      });
  };
};

export const getFollowings = () => {
  return (dispatch) => {
    return axios.get(
      `${configUrls.root}/followings/`,
      config,
    )
      .then((response) => {
        if (response) {
          dispatch({
            type: 'GET_FOLLOWINGS_SUCCESS',
            payload: response.data.followed_users,
          });
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({ type: 'GET_FOLLOWINGS_ERROR', error: error.data });
        }
      });
  };
};
