import { PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const MobileSidebar = ({ setMobileSidebar, username, displayName }) => {
  return (
    <nav className="flex md:hidden fixed right-0 top-0 h-screen z-50  ">
      <section
        onClick={() => setMobileSidebar(false)}
        className="w-[30vw] h-screen bg-overlay"
      ></section>

      <section className="w-[75vw] bg-accent">
        <section className="mt-4 px-5 h-[15vh] pt-5">
          <div className="flex items-center  gap-3 h-fit">
            <div
              className=" w-[70px] h-[70px] rounded-full border-2 border-black grid place-items-center
               bg-white"
            >
              <PersonIcon width="35" height="35" />
            </div>

            <div className="">
              <h1 className="m-0 p-0 font-bold text-xl">{displayName}</h1>
              <p className="m-0 p-0 text-text-accent font-semibold text-medium">
                @{username}
              </p>
            </div>
          </div>

          <ul className="flex mt-3 ml-3 items-center gap-3">
            <li className="text-[1rem] font-semibold">
              <strong>832</strong>
              <span className="text-text-accent ml-1">Following</span>
            </li>
            <li className="text-[1rem] font-semibold">
              <strong>832</strong>
              <span className="text-text-accent ml-1">Followers</span>
            </li>
          </ul>
        </section>

        <section className="bg-white h-[80vh] px-5 mt-3 py-4">
          <ul className=" grid gap-2 mt-2 text-[1.17rem]">
            <li className="items-center font-semibold">
              <Link href="/profile" className="flex items-center ">
                <>
                  <span>Profile</span>
                </>
              </Link>
            </li>
            <li className="flex items-center font-semibold">
              <span>Saved</span>
            </li>
            <li className="flex items-center font-semibold">
              <span>Jobs</span>
            </li>
            <li className="flex items-center font-semibold">
              <span>Invitation Request</span>
            </li>
            <li className="flex items-center font-semibold">
              <span>Blocked Account</span>
            </li>
            <li className="flex items-center font-semibold">
              <span>Create Page</span>
            </li>
            <li className="flex items-center font-semibold">
              <span>Create Group</span>
            </li>
            <li className="flex items-center font-semibold">
              <span>Report a problem</span>
            </li>
            <li className="flex items-center font-semibold">
              <span>Delete Account</span>
            </li>
            <li className="flex items-center font-semibold">
              <span>Help</span>
            </li>
          </ul>
        </section>
      </section>
    </nav>
  );
};

export default MobileSidebar;
