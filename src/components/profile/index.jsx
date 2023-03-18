import Posts from '@components/feed/posts';
import MobileSidebar from '@components/ui/sidebar';
import { useUser } from '@hooks/use-User';
import {
  ArrowLeftIcon,
  GitHubLogoIcon,
  PersonIcon,
  SewingPinIcon,
  TextAlignJustifyIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '@utils/api-fns/posts';
import { getUserProfile } from '@utils/api-fns/profile';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import EditProfile from './edit-profile';
import Follow from './follow';

const Profile = () => {
  const { events, query } = useRouter();
  const { user } = useUser();
  const loggedInUser = user.username !== null ? user.username : 'Username';

  const displayName =
    user.displayName !== null ? user.displayName : 'displayName';

  const username = query.username;
  const userId = user.id !== 0 ? user.id : 0;

  const isLoggedInUser = loggedInUser === username;

  const [mobileSidebar, setMobileSidebar] = useState(false);
  const closeMobileSidebar = useCallback(() => {
    setMobileSidebar(false);
  }, [setMobileSidebar]);

  useEffect(() => {
    events.on('routeChangeComplete', closeMobileSidebar);
    return () => {
      events.off('routeChangeComplete', closeMobileSidebar);
    };
  }, [events, closeMobileSidebar]);

  // getting profile details of whatever user this is
  const {
    data: profileData,
    error: profileError,
    isError: errorGettingProfile,
    isLoading: isProfileLoading,
  } = useQuery({
    queryKey: ['userProfile', username],
    queryFn: () => {
      return getUserProfile(username);
    },
    enabled: (user && username) !== undefined,
  });

  const profile = isProfileLoading ? {} : profileData.data.profile;

  // getting the posts of said user
  const {
    data: userPosts,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['userPosts', profile.userId],
    queryFn: () => getUserPosts(profile.userId),
    enabled: profile.userId !== undefined,
  });

  if (isProfileLoading) {
    return (
      <div className="w-[100vw] md:w-[55vw] h-[100vh] overflow-y-scroll scrollbar-hide grid place-items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const posts = userPosts === undefined ? [] : userPosts.allPosts;

  if (!isProfileLoading) {
    console.log('Profile', profile);
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

              {isLoggedInUser ? (
                <EditProfile id={userId} profile={profile} />
              ) : (
                <Follow username={username} />
              )}
            </div>
            <h1 className="font-bold mt-3 p-0 text-[1.15rem]">
              {profile.displayName}
            </h1>
            <p className="m-0 p-0 text-text-accent font-semibold text-[.9rem]">
              @{profile.username}
            </p>

            <p className="mt-[1rem] text-[.95rem] font-semibold">
              {profile.Bio}
            </p>

            {profile.website.trim().length > 0 ? (
              <p className="mt-[.5rem] text-[.9rem] font-semibold text-text-accent">
                Website: <span className="underline">{profile.website}</span>
              </p>
            ) : null}

            <p className="mt-[.3rem] text-[.9rem] flex items-center gap-1 font-semibold text-text-accent">
              <SewingPinIcon />
              {profile.location === null ? (
                <span>Location</span>
              ) : (
                <span>{profile.location}</span>
              )}
            </p>

            <ul className="grid gap-2 md:flex md:gap-3 mt-5">
              {profile.twitter_link.trim().length > 0 ? (
                <Link href={profile.twitter_link}>
                  <li className="flex items-center font-semibold text-sm gap-1 underline cursor-pointer">
                    <TwitterLogoIcon /> {profile.twitter_link}
                  </li>
                </Link>
              ) : null}

              {profile.github_link.trim().length > 0 ? (
                <Link href={profile.github_link}>
                  <li className="flex items-center font-semibold text-sm gap-1 underline cursor-pointer">
                    <GitHubLogoIcon /> {profile.github_link}
                  </li>
                </Link>
              ) : null}
            </ul>

            <ul className="flex list-none gap-3 mt-3 font-medium">
              <li>
                <strong>
                  {profile.followers === null ? 0 : profile.followers}
                </strong>{' '}
                Followers
              </li>
            </ul>

            <ul className="mt-[2rem] flex items-center list-none justify-between px-[1.2rem] font-semibold md:px-[2rem] lg:px-[3rem]">
              <li className="cursor-pointer">Posts</li>
              <li className="cursor-pointer">Photos</li>
              <li className="cursor-pointer">Videos</li>
              {isLoggedInUser ? (
                <li className="cursor-pointer">Saved</li>
              ) : null}
              <li className="cursor-pointer">Jobs</li>
            </ul>
          </section>
        </section>

        <section className="mt-[2rem]">
          {isLoading ? <span>Loadingg</span> : <Posts posts={posts} />}
        </section>
      </div>
    );
  }
};

export default Profile;
