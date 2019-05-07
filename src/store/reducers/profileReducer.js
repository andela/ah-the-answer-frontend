import axios from 'axios';
import * as ProfileAction from '../../actiontypes/profiles/profileActionTypes';

const initialState = {
  follows: 0,
  followers: 0,
  username: 'Kyppy',
};

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case ProfileAction.UPDATE_FOLLOWS:
      return { ...state, follows: action.followCount };

    case ProfileAction.UPDATE_FOLLOWERS:
      return [
        ...state,
        {
          followers: 0,
        },
      ];
    default:
      return state;
  }
}
