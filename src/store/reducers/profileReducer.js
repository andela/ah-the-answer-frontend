import * as ProfileAction from '../../actiontypes/profiles/profileActionTypes';

const initialState = {
  follows: 0,
  followers: 0,
  givenName: 'Bob',
  userName: 'User',
  bio: 'Default Story',
  profileImg: '...',
};

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case ProfileAction.FETCH_FOLLOWS:
      return {
        ...state,
        follows: action.followCount,
      };

    case ProfileAction.FETCH_FOLLOWERS:
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

    default:
      return state;
  }
}
