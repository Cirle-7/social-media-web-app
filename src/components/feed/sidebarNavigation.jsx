import {
  BellIcon,
  DotsHorizontalIcon,
  EnvelopeClosedIcon,
  HomeIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

const SidebarNav = () => {
  return (
    <nav className="bg-accent md:w-fit lg:w-[15vw] p-3 mt-[2rem] ">
      <ul className="sidebar_nav">
        <li>
          <HomeIcon /> <span>Home</span>
        </li>
        <li>
          <PersonIcon /> <span> Profile</span>
        </li>
        <li>
          <EnvelopeClosedIcon /> <span>Messages</span>
        </li>
        <li>
          <BellIcon /> <span>Notifications</span>
        </li>
        <li>
          <DotsHorizontalIcon /> <span>More</span>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
