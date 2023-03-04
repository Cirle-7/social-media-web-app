import Events from '@components/feed/events';
import SidebarNav from '@components/feed/sidebarNavigation';
import SidebarOptions from '@components/feed/sidebarOptions';
import Trending from '@components/feed/trending';
import { useUser } from '@hooks/use-User';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  ExitIcon,
  PersonIcon,
  TextAlignJustifyIcon,
} from '@radix-ui/react-icons';
import { BellIcon, HomeIcon, MailIcon } from '../svg';

import { useCallback } from 'react';
import Button from '../button';
import Input from '../input';
import MobileSidebar from '../sidebar';

const Post_FeedLayout = ({ children }) => {
  const { replace, pathname, events } = useRouter();
  const { user: userStore, resetUserStore } = useUser();
  const [user, setUser] = useState({});
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const closeMobileSidebar = useCallback(() => {
    setMobileSidebar(false);
  }, [setMobileSidebar]);

  useEffect(() => {
    //remove the sidebar on page change
    events.on('routeChangeComplete', closeMobileSidebar);

    return () => {
      events.off('routeChangeComplete', closeMobileSidebar);
    };
  }, [events, closeMobileSidebar]);

  /** because zustand is using localStorage to persist &
       SSR pages cant't access local-storage, useEffect is used to only load the details from localSrorage on the client-sde
       */

  useEffect(() => {
    setUser(userStore);
  }, [userStore]);

  const logout = () => {
    document.cookie = `token=;expires=${Date.now()}`;
    resetUserStore();
    replace('/');
  };
  const onProfilePage = pathname.includes('profile');
  const username = user.username !== null ? user.username : 'Username';
  const displayName =
    user.displayName !== null ? user.displayName : 'displayName';

  return (
    <div className="bg-primary text-black flex">
      {/** Tablet & Desktop --> Left Sidebar / User Options */}
      <section className="hidden w-20 md:grid h-[100vh] overflow-y-scroll scrollbar-hide">
        <div className="grid place-items-center py-[1rem]  ">
          <h2>LOGO</h2>

          <SidebarNav />
          <SidebarOptions />
          <div className="mt-[1rem] grid place-items-center gap-1">
            <PersonIcon />
            <h2>{username}</h2>
            <Button className="btn bg-black text-white" onClick={logout}>
              <ExitIcon /> <span className="ml-2">Log Out</span>
            </Button>
          </div>
        </div>
      </section>

      {/** Mobile Header on /Feed Page*/}
      {!onProfilePage ? (
        <section className="bg-white z-[3] flex items-center justify-between w-screen md:hidden px-3 py-3 fixed top-0">
          <h2 className="font-semibold text-[1rem] ">LOGO</h2>
          <div className="p-1" onClick={() => setMobileSidebar(true)}>
            <TextAlignJustifyIcon width={38} height={37} />
          </div>
        </section>
      ) : null}

      {/** Mobile Sidebar */}
      {mobileSidebar ? (
        <MobileSidebar
          username={username}
          displayName={displayName}
          setMobileSidebar={setMobileSidebar}
        />
      ) : null}

      <>{children}</>

      {/** Tablet & Desktop --> Right Side Bar : Trending, Events & Co. */}
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

      {/** Mobile -->  Footer Navigation on Mobile (Only shows in /feed) */}
      {!onProfilePage ? (
        <nav className="bg-accent  w-[100vw] absolute bottom-0 z-[3] py-2 text-black md:hidden">
          <ul className="list-none flex items-center justify-between px-10 text-[.9rem] ">
            <li>
              <Link
                href="/feed"
                className="grid place-items-center font-semibold "
              >
                <>
                  {pathname === '/feed' ? <HomeIcon filled /> : <HomeIcon />}
                  <span
                    className={` ${
                      pathname === '/feed' ? 'text-black' : 'text-text-accent'
                    }`}
                  >
                    Feed
                  </span>
                </>
              </Link>
            </li>

            <li>
              <Link
                href="/messages"
                className="grid place-items-center font-semibold  relative py-1"
              >
                <>
                  {pathname === '/messages' ? (
                    <MailIcon filled />
                  ) : (
                    <MailIcon />
                  )}
                  <span
                    className={` ${
                      pathname === '/messages'
                        ? 'text-black'
                        : 'text-text-accent'
                    }`}
                  >
                    Messages
                  </span>
                </>
              </Link>
            </li>
            {/* <li className="grid place-items-center font-semibold">
              <BackpackIcon />
              <span>Jobs</span>
            </li> */}

            <li className="grid place-items-center font-semibold  relative py-1">
              {pathname === '/messages' ? (
                <>
                  <BellIcon />
                  <span className=" text-black">Notifications</span>
                </>
              ) : (
                <>
                  <BellIcon filled />
                  <span className=" text-text-accent">Notifications</span>
                </>
              )}
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

export default Post_FeedLayout;
