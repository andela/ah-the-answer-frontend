import * as ProfileAction from '../actiontypes/profiles/profile';

export const updateFollows = () => ({
  type: ProfileAction.UPDATE_FOLLOWS,
});

export const updateFollowers = () => ({
  type: ProfileAction.UPDATE_FOLLOWERS,
});
