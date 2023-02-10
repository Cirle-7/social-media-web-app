import {
  BellIcon,
  DotsHorizontalIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

const SidebarOptions = () => {
  return (
    <div className="bg-accent p-3 md:w-[12vw] lg:w-[15vw] mt-[2rem] ">
      <ul className="sidebar_nav">
        <li>
          <PaperPlaneIcon />
          <span className="text-sm">Invitation Request</span>
        </li>
        <li>
          <PersonIcon />
          <span className="text-sm"> Blocked Accounts</span>
        </li>
        <li>
          <EnvelopeClosedIcon />
          <span className="text-sm"> Create Page</span>
        </li>
        <li>
          <BellIcon />
          <span className="text-sm">Create Group</span>
        </li>
        <li>
          <DotsHorizontalIcon />
          <span className="text-sm">Delete Account</span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarOptions;
