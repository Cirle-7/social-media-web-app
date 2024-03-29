import CommentDialog from '@components/ui/comments-dialog';
import PostOptions from '@components/ui/post-options';
import { useUser } from '@hooks/use-User';
import {
  BarChartIcon,
  HeartFilledIcon,
  HeartIcon,
  PersonIcon,
  Share2Icon,
} from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dislikePost, likePost, sharePost } from '@utils/api-fns/posts';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Posts = ({ posts, isLoading }) => {
  const { user } = useUser();
  const { pathname } = useRouter();

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });

  const likeAPost = (id) => {
    likeMutation.mutate(id);
  };

  const dislikeMutation = useMutation({
    mutationFn: dislikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });

  const dislikeAPost = (id) => {
    dislikeMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="grid place-items-center ">
        <p className="font-semibold text-[1.2rem]">
          You do not have any posts. Consider making a post
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.map(({ post }) => (
        <div
          key={post.id.toString()}
          className="border z-[2] md:z-0 border-t-0 border-l-0 
          border-r-0 border-black 
          w-[100vw] md:w-[50vw] mt-[.5rem]"
        >
          <div className="flex py-1">
            <div className="ml-[.5rem] w-[40px] h-[40px] rounded-full border-2 border-black grid place-items-center">
              <Link href={`/${post.user.username}`}>
                <PersonIcon width="30" height="30" />{' '}
              </Link>
            </div>

            <div className="ml-2">
              <div className="flex justify-between items-center">
                <div>
                  <Link
                    href={
                      pathname.includes('profile')
                        ? `/${post.user.username}`
                        : `profile/${post.user.username}`
                    }
                  >
                    <h2 className="font-bold m-0 p-0">
                      {post.user.displayName}
                    </h2>
                  </Link>
                  <div className="flex items-center text-text-accent gap-2">
                    <p className="font-base text-sm">@{post.user.username} </p>
                    <div className="bg-text-accent w-[5px] h-[5px] rounded-full"></div>
                    <p className="text-sm">{post.createdAt}</p>
                  </div>
                </div>

                <div className="ml-5">
                  <PostOptions
                    id={post.id}
                    userId={post.user.id}
                    text={post.body}
                  />
                </div>
              </div>

              <p className="text-base mt-1">{post.body}</p>
              {/** Interaction Icons */}
              <ul className="list justify-between w-[70vw] md:w-[40vw] mt-3">
                <li className="cursor-pointer">
                  <CommentDialog
                    id={post.id}
                    username={post.user.username}
                    displayName={post.user.displayName}
                    text={post.body}
                    commentsCount={post.commentsNo}
                  />
                </li>

                {post.likes.map((data) => data.userId).includes(user.id) ? (
                  <li onClick={() => dislikeAPost(post.id)}>
                    <HeartFilledIcon />
                    <span>{post.likesNo}</span>
                  </li>
                ) : (
                  <li onClick={() => likeAPost(post.id)}>
                    <HeartIcon />
                    <span>{post.likesNo}</span>
                  </li>
                )}

                <li className="cursor-pointer">
                  <BarChartIcon /> <span>{post.views}</span>
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    sharePost({
                      title: `Post from ${post.user.username}`,
                      text: post.body,
                      url: 'https://example.com',
                    })
                  }
                >
                  <Share2Icon />
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
