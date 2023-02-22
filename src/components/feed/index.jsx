import Button from '@components/ui/button';
import Input from '@components/ui/input';
import { useUser } from '@hooks/use-User';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Events from './events';
import PostBox from './postBox';
import Posts from './posts';
import SidebarNav from './sidebarNavigation';
import SidebarOptions from './sidebarOptions';
import Trending from './trending';
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

  // console.log('saved token', token);

  return (
    <div className="bg-primary text-black flex">
      {/** Left Sidebar / User Options */}
      <section className="hidden w-20 md:grid h-[100vh] overflow-y-scroll scrollbar-hide">
        <div className="grid place-items-center py-[1rem]  ">
          <h2>LOGO</h2>

          <SidebarNav />
          <SidebarOptions />
          <div className="mt-[1rem] grid place-items-center gap-1">
            <PersonIcon />
            <h2>{user.username !== null ? user.username : 'Username'}</h2>
            <Button className="btn bg-black text-white" onClick={logout}>
              {' '}
              <ExitIcon /> <span className="ml-2">Log Out</span>{' '}
            </Button>
          </div>
        </div>
      </section>

      {/**Feed Section */}
      <section className="w-[100vw] md:w-[55vw] h-[100vh] overflow-y-scroll scrollbar-hide">
        <div className="grid place-items-center ">
          {/** Mobile Header */}
          <section className="bg-accent flex items-center w-screen md:hidden px-2 py-3  fixed top-0">
            <div className="ml-[.5rem] w-[30px] h-[30px] rounded-full border-2 border-black grid place-items-center">
              <PersonIcon width="25" height="25" />
            </div>
            <h2 className="font-bold ml-[30vw]">LOGO</h2>
          </section>

          {/*Post Box*/}
          <PostBox />

          {/** Posts Section */}
          <section className="grid gap-3 my-[4rem] md:my-3">
            <Posts posts={mockPosts} />
          </section>
        </div>
      </section>

      {/** Right Side Bar : Trending, Events & Co. */}
      <section
        className="md:grid bg-primary hidden border border-solid 
        w-[25vw] h-[100vh] overflow-y-scroll  scrollbar-hide"
      >
        {/** Search Bar */}
        <div className="mt-2 grid place-items-center">
          <label htmlFor="search">
            <Input
              placeholder="Search SMWA"
              name="search"
              className="search pl-7 pr-3 py-[.5rem] rounded-full bg-accent  placeholder-text-accent
            focus:outline-dotted focus:border-sky-600 font-semibold placeholder-opacity-75 "
              type="text"
            />
          </label>
        </div>

        {/** Trending */}
        <Trending />

        {/**Events */}
        <Events />

        {/** Miscellaneous */}
        <section className="grid grid-cols-2 gap-y-3 px-3 mt-10">
          <span className="text-text-accent text-sm">Terms of Services</span>
          <span className="text-text-accent text-sm">Privacy Policy</span>
          <span className="text-text-accent text-sm">Cookies Policy</span>
          <span className="text-text-accent text-sm">Accessibility</span>
          <span className="text-text-accent text-sm">Ads Info</span>
          <span className="text-text-accent text-sm">More</span>
        </section>
      </section>
    </div>
  );
};

export default Feed;
