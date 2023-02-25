export const makePost = (newPost) => {
  return fetch('https://www.circle7.codes/api/v1/post', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => {
      response.json();
    })
    .then((data) => {
      console.log('newPost', newPost);
      console.log('data', data);
      return data;
    });
};

export const getUserPosts = () => {
  return fetch('https://www.circle7.codes/api/v1/post/', {
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

export const likePost = (id) => {
  return fetch(`https://www.circle7.codes/api/v1/post/like/${id.id}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(id),
  });
};

export const dislikePost = (id) => {
  return fetch(`https://www.circle7.codes/api/v1/post/like/${id.id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
  });
};

const saveinDraft = () => {};

export const deletePost = (id) => {
  return fetch(`https://www.circle7.codes/api/v1/post/${id.id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
  });
};

export const editPost = (data) => {
  console.log('Edit Params', data);
  return fetch(`https://www.circle7.codes/api/v1/post/${data.id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(data.textEdit),
  });
};
