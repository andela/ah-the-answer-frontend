import axios from 'axios';
import * as ProfileAction from '../actionTypes/profileActionTypes';
import authHeader from '../../helpers/authHeader';

// const configUrls = {
//   root: 'https://ah-the-answer-backend-staging.herokuapp.com/api/articles/',
// };

const configUrls = {
  root: 'http://127.0.0.1:8000/api/',
};


const config = {
  headers: authHeader(),
};

export const fetchFollows = () => {
  return (dispatch) => {
    return axios.get(`${configUrls.root}follows/count/Kyppy/`, config)
      .then((response) => {
        // handle success
        dispatch({
          type: 'profile/FETCH_FOLLOWS',
          followCount: response.data.success[0].follows,
        });
      })
  };
};

export const fetchFollowers = () => (dispatch) => {
  return axios.get(`${configUrls.root}follows/count/Kyppy/`)
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_FOLLOWERS,
        followerCount: response.data.success[1].followers,
      });
    })
};

export const fetchBio = () => (dispatch) => {
  return axios.get(`${configUrls.root}profiles/Kyppy/`, config)
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_BIO,
        userBio: response.data.profile.user_bio,
      });
    })
};

export const fetchName = () => (dispatch) => {
  return axios.get(`${configUrls.root}profiles/Kyppy/`, config)
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_NAME,
        givenName: response.data.profile.name,
        userName: response.data.profile.username,
      });
    })
};

export const updateProfile = (name, bio) => (dispatch) => {
  return axios.put(`${configUrls.root}profile/Kyppy/edit/`, { profile: { name: name, user_bio: bio } }, config)
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.UPDATE_PROFILE,
        updateMessage: response.data.success,
      });
    })
};

export const resetProfileUpdate = () => (dispatch) => {
  dispatch({
    type: ProfileAction.RESET_UPDATE_MESSAGE,
    resetUpdateMessage: false,
  });
};
