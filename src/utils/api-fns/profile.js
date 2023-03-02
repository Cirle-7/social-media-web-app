export const getUserProfile = (username) => {
  console.log('username: ', username);
  return fetch(`https://www.circle7.codes/api/v1/profiles/${username}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};
