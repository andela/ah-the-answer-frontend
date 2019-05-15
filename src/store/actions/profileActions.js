import axios from 'axios';
import * as ProfileAction from '../actionTypes/profileActionTypes';

// const setAxios = require('axios');

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.1gC7fqNwCSTYxCQAHvfNmfyb2GhenC6jG0nKLJ-izCM';
// setAxios.defaults.headers.common = { Authorization: `Bearer ${token}` };

export const fetchFollows = () => {
  return (dispatch) => {
    return axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/')
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
  return axios.get(' http://127.0.0.1:8000/api/follows/count/Kyppy/')
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
  return axios.get(' http://127.0.0.1:8000/api/profiles/Kyppy/')
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
  return axios.get(' http://127.0.0.1:8000/api/profiles/Kyppy/')
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
  return axios.put('http://127.0.0.1:8000/api/profile/Kyppy/edit/', { profile: { name: name, user_bio: bio } })
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
