export const parseJWT = () => {
  const details = JSON.parse(localStorage.getItem('user-details'));
  const token = details.state.token;
  const decode = JSON.parse(atob(token.split('.')[1]));
  if (decode.exp * 1000 < new Date().getTime()) {
    return 'logged out';
  } else {
    console.log('logged in');
    return 'logged in';
  }
};
