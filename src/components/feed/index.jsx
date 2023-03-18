import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@utils/api-fns/posts';
import { useRouter } from 'next/router';
import PostBox from './postBox';
import Posts from './posts';

const Feed = () => {
  const { push } = useRouter();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['userPosts'],
    queryFn: getAllPosts,
  });

  console.log('posts', data);

  const allPosts = data === undefined ? [] : data.allPosts;
  return (
    <section className="w-[100vw] md:w-[55vw] h-[100vh] md:overflow-y-scroll md:scrollbar-hide">
      <div className="grid place-items-center ">
        {/*Post Box*/}
        <PostBox />

        {/** Posts Section */}
        <section className="grid gap-3  md:my-3">
          <Posts posts={allPosts} />
        </section>
      </div>
    </section>
  );
};

export default Feed;
