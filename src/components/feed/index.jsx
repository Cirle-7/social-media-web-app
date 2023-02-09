import Button from '@components/ui/button';
import {
  BellIcon,
  DotsHorizontalIcon,
  EnvelopeClosedIcon,
  ExitIcon,
  HomeIcon,
  PaperPlaneIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

const Feed = () => {
  return (
    <div className="bg-primary text-black flex">
      <section className="hidden border border-solid border-black w-20 md:grid h-[100vh] overflow-y-scroll">
        <div className="grid place-items-center py-[1rem]  ">
          <h2>LOGO</h2>

          <div className="bg-accent py-3 px-3 w-fit mt-[2rem] ">
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
          </div>

          <div className="bg-accent py-3 px-3 w-fit mt-[2rem] ">
            <ul className="sidebar_nav">
              <li>
                <PaperPlaneIcon />{' '}
                <span className="text-sm">Invitation Request</span>
              </li>
              <li>
                <PersonIcon />{' '}
                <span className="text-sm"> Blocked Accounts</span>
              </li>
              <li>
                <EnvelopeClosedIcon />{' '}
                <span className="text-sm"> Create Page</span>
              </li>
              <li>
                <BellIcon /> <span className="text-sm">Create Group</span>
              </li>
              <li>
                <DotsHorizontalIcon />{' '}
                <span className="text-sm">Delete Account</span>
              </li>
            </ul>
          </div>

          <div className="mt-[1rem] grid place-items-center gap-1">
            <PersonIcon />
            <h2>Username</h2>
            <Button className="bg-black text-white">
              {' '}
              <ExitIcon /> <span className="ml-2">Log Out</span>{' '}
            </Button>
          </div>
        </div>
      </section>

      <section className="border-2 border-solid border-red-400 w-60 ">
        feed
      </section>

      <section className="hidden border border-solid border-green-300 md:grid w-20">
        <h2>trending</h2>
      </section>
    </div>
  );
};

export default Feed;
