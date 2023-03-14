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
  console.log('eP', data);

  return fetch(`https://www.circle7.codes/api/v1/profiles/${data.username}`, {
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

// {
//   "status": "success",
//   "message": "Profile found",
//   "data": {
//     "profile": {
//       "username": "jolenejolene",
//       "displayName": "philip",
//       "Bio": "hi, it's jolenejolene nice to meet you all",
//       "website": "",
//       "location": null,
//       "github_link": "",
//       "twitter_link": "",
//       "avatarURL": "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
//       "headerURL": "https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631296__340.jpg",
//       "followers": null,
//       "isdeactivated": false
//     }
//   }
// }
