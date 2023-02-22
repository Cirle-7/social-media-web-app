import Button from '@components/ui/button';
import Input from '@components/ui/input';
import {
  BarChartIcon,
  FaceIcon,
  ImageIcon,
  PersonIcon,
  VideoIcon,
} from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';

const PostBox = () => {
  const mutation = useMutation({
    mutationFn: (newPost) => {
      return fetch('https://www.circle7.codes/api/v1/post', {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(newPost),
      })
        .then((response) => {
          response.json();
          console.log('re.json', response);
        })
        .then((data) => {
          console.log('newPost', newPost);
          console.log('data', data);
          // getResponse(data);
        });
    },
  });

  const createPost = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const body = form.get('post');
    // console.log('body', body);

    mutation.mutate({
      body,
    });
  };

  return (
    <section className=" hidden bg-accent w-[100vw] md:w-[55vw] px-3 py-4 md:flex items-center">
      <div className="ml-[.5rem] w-[40px] h-[40px] rounded-full border-2 border-black grid place-items-center">
        <PersonIcon width="30" height="30" />
      </div>

      <div className="ml-[2.5rem]">
        <form action="" onSubmit={createPost}>
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

          <div className="flex mt-3 justify-end">
            <Button
              type="submit"
              className="bg-black text-white py-[0rem] px-[.5rem]"
            >
              {' '}
              Post{' '}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostBox;
