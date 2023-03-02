import Button from '@components/ui/button';
import {
  BarChartIcon,
  FaceIcon,
  ImageIcon,
  PersonIcon,
  VideoIcon,
} from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makePost } from '@utils/api-fns/posts';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const PostBox = () => {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: makePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      toast.success('Post sent successfully');
      setText('');
    },
    onError: () => {
      toast.error('Error sending post');
    },
  });

  const createPost = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const body = text;

    postMutation.mutate({
      body,
    });
  };

  return (
    <section className=" bg-accent mt-[3rem] md:mt-0 w-[100vw] md:w-[55vw] px-3 py-4 md:flex items-center">
      <div className=" hidden ml-[.5rem] w-[40px] h-[40px] rounded-full border-2 border-black md:grid place-items-center">
        <PersonIcon width="30" height="30" />
      </div>

      <div className="md:ml-[2.5rem]">
        <form action="" onSubmit={createPost}>
          <label htmlFor="post"></label>
          <textarea
            type="text"
            name="post"
            placeholder="Say something"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="py-[.4rem] px-[.4rem] w-[90vw] md:w-[40vw] rounded-sm"
          />

          {/* <div className="flex justify-end">
            <span className="text-text-accent text-sm">
              {`${text.length} char${text.length > 1 ? 's' : ''}`}
            </span>
          </div> */}
          <ul className=" flex my-[0] mx-auto md:flex  postBoxItems mt-[.5rem] md:w-[40vw] justify-between">
            <li className="cursor-pointer">
              <VideoIcon />
              <span>Live</span>{' '}
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

          <div className="flex mt-3 justify-center gap-2">
            <Button
              type="button"
              className="border  border-black rounded-md text-sm md:font-medium py-[.2rem] px-[.5rem]"
            >
              Save in draft
            </Button>
            <Button
              type="submit"
              className="bg-black rounded-md font-medium text-white py-[.2rem] px-[1rem]"
            >
              Make Post
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostBox;
