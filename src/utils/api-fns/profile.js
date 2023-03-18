import { BASE_URL } from '@utils/constants';

export const getUserProfile = (username) => {
  return fetch(`${BASE_URL}/profiles/${username}`, {
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
  return fetch(`${BASE_URL}/users/${data.userId}`, {
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
      return data;
    });
};

export const editProfile = (data) => {
  return fetch(`${BASE_URL}/profiles/${data.profileId}`, {
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
      return data;
    });
};

export const followUser = (username) => {
  return fetch(`${BASE_URL}/follow/${username}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('follow', data);
      return data;
    });
};

export const unfollowUser = (username) => {
  return fetch(`${BASE_URL}/unfollow/${username}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('follow', data);
      return data;
    });
};
