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
    console.log(userName);
    return axios.post(
      `${configUrls.root}/follow/${userName}`,
      config,
    )
      .then(() => {
        dispatch({ type: 'FOLLOW_USER', payload: true });
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          dispatch({ type: 'FOLLOW_USER_ERROR', error });
        }
      });
  };
};

export const unFollow = (userName) => {
  return (dispatch) => {
    return axios.delete(
      `${configUrls.root}/unfollow/${userName}`,
      {},
      config,
    )
      .then(() => {
        dispatch({ type: 'UNFOLLOW_USER', payload: true });
      })
      .catch((error) => {
        dispatch({ type: 'UNFOLLOW_USER_ERROR', error: error.response.data });
      });
  };
};