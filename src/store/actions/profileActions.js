import axios from 'axios';
import * as ProfileAction from '../actionTypes/profileActionTypes';
import authHeader from '../../helpers/authHeader';

const setAxios = require('axios');

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
      .catch((error) => {
      // handle error
        console.log('Error fecthing and parsing data', error);
      });
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
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
};

export const fetchBio = () => (dispatch) => {
  return axios.get(`${configUrls.root}profiles/Kyppy/`)
    .then((response) => {
      // handle success
      dispatch({
        type: ProfileAction.FETCH_BIO,
        userBio: response.data.profile.user_bio,
      });
    })
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
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
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
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
    .catch((error) => {
      // handle error
      console.log('Error fecthing and parsing data', error);
    });
};

export const resetProfileUpdate = () => (dispatch) => {
  dispatch({
    type: ProfileAction.RESET_UPDATE_MESSAGE,
    resetUpdateMessage: false,
  });
};
