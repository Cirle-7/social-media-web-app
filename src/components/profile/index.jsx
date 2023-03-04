import Posts from '@components/feed/posts';
import Button from '@components/ui/button';
import MobileSidebar from '@components/ui/sidebar';
import { useUser } from '@hooks/use-User';
import {
  ArrowLeftIcon,
  Pencil2Icon,
  PersonIcon,
  SewingPinIcon,
  TextAlignJustifyIcon,
} from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '@utils/api-fns/posts';
import { getUserProfile } from '@utils/api-fns/profile';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const Profile = () => {
  const { events } = useRouter();
  const [user, setUser] = useState({});
  const { user: userStore } = useUser();
  useEffect(() => {
    setUser(userStore);
  }, [userStore]);
  const username = user.username !== null ? user.username : 'Username';
  const displayName =
    user.displayName !== null ? user.displayName : 'displayName';

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

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['userPosts'],
    queryFn: getUserPosts,
  });

  const {
    data: profileData,
    error: profileError,
    isError: profileIsError,
    isLoading: profileIsLoading,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => {
      return getUserProfile(user.username);
    },
    enabled: (user && user.username) !== undefined,
  });

  if (isLoading || profileIsLoading) {
    return (
      <div className="w-[100vw] md:w-[55vw] h-[100vh] overflow-y-scroll scrollbar-hide grid place-items-center">
        <p>Loading...</p>
      </div>
    );
  }
  const allPosts = data.allPosts;
  console.log('user profile', profileData);

  return (
    <div className="w-[100vw] md:w-[55vw] h-[100vh] overflow-y-scroll scrollbar-hide">
      <section className="relative">
        <div className="">
          <Image
            src="/header.jpeg"
            width={100}
            height={20}
            sizes="100%"
            alt="header"
            className="w-[100vw] md:w-[55vw] h-[12vh] md:h-[10vh] lg:h-[15vh]"
          />

          <div className="flex justify-between w-[100vw] md:hidden z-[2] absolute top-0 py-3 px-3">
            <div className="bg-slate-800 rounded-full p-1">
              <Link href="/feed">
                <ArrowLeftIcon color="white" width={28} height={27} />
              </Link>
            </div>

            <div
              className="bg-slate-800 rounded-full p-1 "
              onClick={() => setMobileSidebar(true)}
            >
              <TextAlignJustifyIcon color="white" width={28} height={27} />
            </div>
          </div>
        </div>

        {mobileSidebar ? (
          <MobileSidebar
            username={username}
            displayName={displayName}
            setMobileSidebar={setMobileSidebar}
          />
        ) : null}

        <section className="bg-accent px-4 py-2 relative">
          <div className="flex items-center justify-between mt-[1rem]">
            <div
              className="ml-[.5rem] w-[70px] h-[70px] rounded-full border-2 border-black grid place-items-center
              absolute top-[-2.3rem] bg-white
            "
            >
              <PersonIcon width="50" height="50" />
            </div>

            <Button
              className="mt-16 mr-5 md:mr-[3rem] flex justify-end absolute right-0 items-center gap-1 font-medium
              border border-text-accent py-1 px-2 rounded-full text-[.9rem]"
            >
              <Pencil2Icon width={20} height={20} />
              Edit Profile
            </Button>
          </div>
          <h1 className="font-bold mt-3 p-0 text-[1.15rem]">{displayName}</h1>
          <p className="m-0 p-0 text-text-accent font-semibold text-[.9rem]">
            @{username}
          </p>

          <p className="mt-[1rem] text-[.95rem] font-semibold">
            I&apos;m a fullstack developer/software engineer and I am open to
            remote jobs
          </p>

          <p className="mt-[.5rem] text-[.9rem] font-semibold text-text-accent">
            Talks about : #SWE #Gaming #BackendEngineering #EmbeddedSystems
            #SysAdmin
          </p>

          <p className="mt-[.3rem] text-[.9rem] flex items-center gap-1 font-semibold text-text-accent">
            <SewingPinIcon /> Port Harcout, Nigeria
          </p>

          <ul className="flex list-none gap-3 mt-3 font-medium">
            <li>
              <strong>894</strong> Posts
            </li>
            <li>
              <strong>87</strong> Following
            </li>
            <li>
              <strong>845k</strong> Followers
            </li>
          </ul>

          <ul className="mt-[2rem] flex items-center list-none justify-between px-[1.2rem] font-semibold md:px-[2rem] lg:px-[3rem]">
            <li className="cursor-pointer">Posts</li>
            <li className="cursor-pointer">Photos</li>
            <li className="cursor-pointer">Videos</li>
            <li className="cursor-pointer">Saved</li>
            <li className="cursor-pointer">Jobs</li>
          </ul>
        </section>
      </section>

      <section className="mt-[2rem]">
        <Posts posts={allPosts} />
      </section>
    </div>
  );
};

export default Profile;
