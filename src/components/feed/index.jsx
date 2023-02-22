import { useUser } from '@hooks/use-User';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostBox from './postBox';
import Posts from './posts';
const mockPosts = [
  {
    id: 1,
    name: 'Jogn Doe',
    username: 'dev1',
    date: '1 Jan',
    text: 'I love my word',
    likeCount: 200,
    replyCount: 50,
    shareCount: 60,
    repostCount: 15,
  },
  {
    id: 2,
    name: 'Jane Doe',
    username: 'janedoe',
    date: '1 Jan',
    text: 'I love my word',
    likeCount: 200,
    replyCount: 50,
    shareCount: 60,
    repostCount: 15,
  },
  {
    id: 3,
    name: 'Douglas King',
    username: 'dougxtra',
    date: '1 Jan',
    text: 'I love my word',
    likeCount: 200,
    replyCount: 50,
    shareCount: 60,
    repostCount: 15,
  },
  {
    id: 4,
    name: 'Seyi Vibez',
    username: 'seyi_vibez',
    date: '1 Jan',
    text: 'Santa Monica, Santa Claus, Subject verb, Maker clause, Seyi verb, Seyi vibes',
    likeCount: 1200,
    replyCount: 1050,
    shareCount: 600,
    repostCount: 155,
  },
  {
    id: 5,
    name: 'Divine',
    username: 'heisrema',
    date: '1 Jan',
    text: 'I love my word',
    likeCount: 120000,
    replyCount: 700,
    shareCount: 6000,
    repostCount: 1500,
  },
  {
    id: 6,
    name: 'Dan',
    username: 'danabramov',
    date: '1 Jan',
    text: 'I love my word',
    likeCount: 200,
    replyCount: 50,
    shareCount: 60,
    repostCount: 15,
  },
  {
    id: 7,
    name: 'Vercel',
    username: 'vercel',
    date: '1 Jan',
    text: 'I love my word',
    likeCount: 200,
    replyCount: 50,
    shareCount: 60,
    repostCount: 15,
  },
  {
    id: 8,
    name: 'Circle',
    username: 'circle',
    date: '1 Jan',
    text: 'I love my word',
    likeCount: 200,
    replyCount: 50,
    shareCount: 60,
    repostCount: 15,
  },
];

const Feed = () => {
  const router = useRouter();
  const { user: userStore, token, resetUserStore } = useUser();
  const [user, setUser] = useState({});
  
  {
    /** because zustand is using localStorage to persist &
     SSR pages cant't access local-storage, useEffect is used to only load the details from localSrorage on the client-sde*/
    }
  useEffect(() => {
    setUser(userStore);
  }, [userStore, token]);

  const logout = () => {
    document.cookie = `token=;expires=${Date.now()}`
    router.replace('/');
    resetUserStore();
  };

  return (
    <section className="w-[100vw] md:w-[55vw] h-[100vh] md:overflow-y-scroll md:scrollbar-hide">
      <div className="grid place-items-center ">
        {/** Mobile Header */}

        {/*Post Box*/}
        <PostBox />

        {/** Posts Section */}
        <section className="grid gap-3 my-[4rem] md:my-3">
          <Posts posts={mockPosts} />
        </section>
      </div>
    </section>
  );
};

export default Feed;
