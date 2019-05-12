const authUser = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const tokenRyanwire = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.3XR1d9Y5qnbw9FXJiNr3VIbSq_gnBg9yyY6rVJkrXU4';
  const user = {
    username: 'likeuser',
    token: tokenRyanwire,
  };
  if (user && user.token) {
    return user;
  }
  return false;
};

export default authUser;
