export const getUserProfile = (username) => {
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

export const editDisplayName = (data) => {
  console.log('displyName', data);

  return fetch(`https://www.circle7.codes/api/v1/users/auth/${data.id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify({ displayName: data.displayName }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('edit response', data);
      return data;
    });
};

export const editProfile = (data) => {
  console.log('profile edit object', data);

  return fetch(`https://www.circle7.codes/api/v1/profiles/${data.id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(data.profileEdit),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('edit profile', data);
      return data;
    });
};
