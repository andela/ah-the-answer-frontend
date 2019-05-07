const authStatus = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return true;
  }
  return false;
};

export default authStatus;
