import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '@utils/api';
import { useRouter } from 'next/router';
import PostBox from './postBox';
import Posts from './posts';

const Feed = () => {
  const { push } = useRouter();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['userPosts'],
    queryFn: getUserPosts,
  });

  console.log('posts', data);

  const allPosts = data === undefined ? [] : data.allPosts;
  return (
    <section className="w-[100vw] md:w-[55vw] h-[100vh] md:overflow-y-scroll md:scrollbar-hide">
      <div className="grid place-items-center ">
        {/** Mobile Header */}

        {/*Post Box*/}
        <PostBox />

        {/** Posts Section */}
        <section className="grid gap-3 my-[4rem] md:my-3">
          <Posts posts={allPosts} />
        </section>
      </div>
    </section>
  );
};

export default Feed;
