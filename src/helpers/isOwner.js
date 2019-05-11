import authUser from './authUser';

const isOwner = (author) => {
  const user = authUser();
  if (user.username === author) {
    return true;
  }
  return false;
};

export default isOwner;
