import Events from '@components/feed/events';
import SidebarNav from '@components/feed/sidebarNavigation';
import SidebarOptions from '@components/feed/sidebarOptions';
import Trending from '@components/feed/trending';
import { useUser } from '@hooks/use-User';
import {
  BackpackIcon,
  BellIcon,
  EnvelopeClosedIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
  TextAlignJustifyIcon,
} from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../button';
import Input from '../input';

const Post_FeedLayout = ({ children }) => {
  const { replace, pathname } = useRouter();
  const { user: userStore, token, resetUserStore } = useUser();
  const [user, setUser] = useState({});

  /** because zustand is using localStorage to persist &
       SSR pages cant't access local-storage, useEffect is used to only load the details from localSrorage on the client-sde
       */

  useEffect(() => {
    setUser(userStore);
  }, [userStore]);

  const logout = () => {
    replace('/');
    resetUserStore();
  };
  const onProfilePage = pathname.includes('profile');

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
              <ExitIcon /> <span className="ml-2">Log Out</span>
            </Button>
          </div>
        </div>
      </section>

      {!onProfilePage ? (
        <section className="bg-accent z-[3] flex items-center justify-between w-screen md:hidden px-3 py-3 fixed top-0">
          <h2 className="font-semibold text-[1rem] ">LOGO</h2>
          <div className="p-1">
            <TextAlignJustifyIcon width={22} height={24} />
          </div>
        </section>
      ) : null}

      <>{children}</>

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

      {!onProfilePage ? (
        <div className="bg-accent  w-[100vw] absolute bottom-0 z-[3] py-2 px-4 text-black md:hidden">
          <ul className="list-none flex items-center justify-between ">
            <li className="grid place-items-center font-semibold">
              <HomeIcon /> <span>Feed</span>
            </li>

            <li className="grid place-items-center font-semibold">
              <EnvelopeClosedIcon /> <span>Messages</span>
            </li>
            <li className="grid place-items-center font-semibold">
              <BackpackIcon />
              <span>Jobs</span>
            </li>

            <li className="grid place-items-center font-semibold">
              <BellIcon />
              <span>Notifications</span>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Post_FeedLayout;
