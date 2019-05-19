import * as ProfileAction from '../actionTypes/profileActionTypes';

const initialState = {
  follows: 0,
  followers: 0,
  givenName: 'Bob',
  userName: 'User',
  bio: 'Default Story',
  profileImg: '...',
  updateMessage: false,
  checkfollow: false,
};

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case ProfileAction.FETCH_FOLLOWS:
      return {
        ...state,
        follows: action.followCount,
      };

    case ProfileAction.FETCH_FOLLOWERS:
    console.log(action.followerCount);
      return {
        ...state,
        followers: action.followerCount,
      };

    case ProfileAction.FETCH_BIO:
      return {
        ...state,
        bio: action.userBio,
      };

    case ProfileAction.FETCH_NAME:
      return {
        ...state,
        givenName: action.givenName,
        userName: action.userName,
      };

    case ProfileAction.FETCH_AVATAR:
      return {
        ...state,
        profileImg: action.profilePicture,
      };

    case ProfileAction.UPDATE_PROFILE:
      return {
        ...state,
        updateMessage: action.updateMessage,
      };

    case ProfileAction.RESET_UPDATE_MESSAGE:
      return {
        ...state,
        updateMessage: false,
      };
    
    default:
      return state;
  }
}
