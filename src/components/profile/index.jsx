import Posts from '@components/feed/posts';
import Button from '@components/ui/button';
import { useUser } from '@hooks/use-User';
import {
  ArrowLeftIcon,
  Pencil2Icon,
  PersonIcon,
  SewingPinIcon,
  TextAlignJustifyIcon,
} from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '@utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({});
  const { user: userStore } = useUser();
  useEffect(() => {
    setUser(userStore);
  }, [userStore]);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['userPosts'],
    queryFn: getUserPosts,
  });

  const allPosts = data.allPosts;

  console.log('userdata', allPosts);

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
                <ArrowLeftIcon color="white" width={20} height={20} />
              </Link>
            </div>

            <div className="bg-slate-800 rounded-full p-1">
              <TextAlignJustifyIcon color="white" width={20} height={20} />
            </div>
          </div>
        </div>

        <section className="bg-accent px-4 py-2 relative">
          <div className="flex items-center justify-between mt-[1rem]">
            <div
              className="ml-[.5rem] w-[55px] h-[55px] rounded-full border-2 border-black grid place-items-center
              absolute top-[-2.3rem] bg-white
            "
            >
              <PersonIcon width="50" height="50" />
            </div>

            <Button className="mr-[3rem] flex justify-end absolute right-0 items-center gap-1 font-semibold">
              {' '}
              <Pencil2Icon /> Edit Profile
            </Button>
          </div>
          <h1 className="font-bold m-0 p-0 text-[1.15rem]">
            {user.username !== null ? user.username : 'Username'}
          </h1>
          <p className="m-0 p-0 text-text-accent font-semibold text-[.9rem]">
            {user.displayName !== null ? `@${user.displayName}` : 'username'}
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
