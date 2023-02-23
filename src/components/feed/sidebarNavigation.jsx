import {
  BellIcon,
  DotsHorizontalIcon,
  EnvelopeClosedIcon,
  HomeIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

const SidebarNav = () => {
  return (
    <nav className="bg-accent md:w-fit lg:w-[15vw] p-3 mt-[2rem] ">
      <ul className="sidebar_nav">
        <Link href="/feed">
          <li className="flex items-center gap-[1rem] md:gap-[.5rem] cursor-pointer font-semibold">
            <HomeIcon /> <span>Home</span>
          </li>
        </Link>
        <Link href="/profile">
          <li className="flex items-center gap-[1rem] md:gap-[.5rem] cursor-pointer font-semibold">
            <PersonIcon /> <span> Profile</span>
          </li>
        </Link>
        <Link href="/messages">
          <li className="flex items-center gap-[1rem] md:gap-[.5rem] cursor-pointer font-semibold">
            <EnvelopeClosedIcon /> <span>Messages</span>
          </li>
        </Link>
        <Link href="/notifications">
          <li className="flex items-center gap-[1rem] md:gap-[.5rem] cursor-pointer font-semibold">
            <BellIcon /> <span>Notifications</span>
          </li>
        </Link>

        <li>
          <DotsHorizontalIcon /> <span>More</span>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
