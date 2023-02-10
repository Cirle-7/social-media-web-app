import Input from '@components/ui/input';
import {
  BarChartIcon,
  FaceIcon,
  ImageIcon,
  PersonIcon,
  VideoIcon,
} from '@radix-ui/react-icons';

const PostBox = () => {
  return (
    <section className=" hidden bg-accent w-[100vw] md:w-[55vw] px-3 py-4 md:flex items-center">
      <div className="ml-[.5rem] w-[40px] h-[40px] rounded-full border-2 border-black grid place-items-center">
        <PersonIcon width="30" height="30" />
      </div>

      <div className="ml-[2.5rem]">
        <label htmlFor="post"></label>
        <Input
          type="text"
          name="post"
          placeholder="Say something"
          className="py-[.4rem] px-[.4rem] w-[60vw] md:w-[40vw] rounded-sm"
        />

        <ul className="postBoxItems mt-[.5rem] w-[40vw] justify-between">
          <li className="cursor-pointer">
            <VideoIcon />
            <span>Live Video</span>{' '}
          </li>
          <li className="cursor-pointer">
            <ImageIcon />
            <span>Photos/Video</span>{' '}
          </li>
          <li className="cursor-pointer">
            <BarChartIcon />
            <span>Poll</span>
          </li>

          <li className="cursor-pointer">
            <FaceIcon />
            <span>Emoji</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PostBox;
