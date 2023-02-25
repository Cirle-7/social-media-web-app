const alllikes = [
  {
    id: 1,
    createdAt: '2023-02-24T13:03:58.000Z',
    updatedAt: '2023-02-24T13:03:58.000Z',
    userId: 1,
    postId: 1,
    commentId: null,
    commentCommentId: null,
  },
  {
    id: 2,
    createdAt: '2023-02-24T13:03:58.000Z',
    updatedAt: '2023-02-24T13:03:58.000Z',
    userId: 1,
    postId: 1,
    commentId: null,
    commentCommentId: null,
  },
];

const empty = [];

const allIds = empty.map((data) => data.userId).includes(1);
console.log(allIds);
