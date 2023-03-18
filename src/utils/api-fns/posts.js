import { BASE_URL } from '@utils/constants';

export const makePost = (newPost) => {
  return fetch(`${BASE_URL}/post`, {
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
    .then((data) => data);
};

export const getUserPosts = (id) => {
  return fetch(`${BASE_URL}/post?status=Published&userId=${id}`, {
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

export const getAllPosts = () => {
  return fetch(`${BASE_URL}/post`, {
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
  return fetch(`${BASE_URL}/post/like/${id}`, {
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
  return fetch(`${BASE_URL}/post/like/${id}`, {
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
  return fetch(`${BASE_URL}/post/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
  });
};

export const editPost = (data) => {
  return fetch(`${BASE_URL}/post/${data.id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify({ body: data.textEdit }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const sharePost = async (shareObj) => {
  try {
    await navigator.share(shareObj);
  } catch (err) {
    console.log(err);
  }
};

export const makeComment = (data) => {
  return fetch(`${BASE_URL}/comment/new/${data.postId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify({ body: data.comment }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getAllComments = (data) => {
  return fetch(`${BASE_URL}/comment/new/${data.postId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const deleteComment = (data) => {
  return fetch(`${BASE_URL}/comment/${data.commentId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const likeComment = (data) => {
  return fetch(`${BASE_URL}/comment/like/${data.commentId}`, {
    method: `${data.method}`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Credentials': 'true',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
