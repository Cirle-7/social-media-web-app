import { useUser } from '@hooks/use-User';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@utils/api-fns/posts';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditPost from './edit-post-dialog';

const PostOptions = ({ id, userId, text }) => {
  const [user, setUser] = useState({});
  const { user: userStore } = useUser();
  useEffect(() => {
    setUser(userStore);
  }, [userStore]);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      toast.success('Post Deleted');
    },
  });

  const deleteUserPost = (id) => {
    deleteMutation.mutate({
      id,
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="w-[15px] h-[18px] inline-flex items-center justify-center text-violet11 bg-white  outline-none hover:bg-gray-300"
          y
          aria-label="Customise options"
        >
          <DotsVerticalIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className=" min-w-[90px] md:min-w-[170px] py-[.5rem] z-10 bg-white rounded-md  shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {user.id === userId ? (
            <DropdownMenu.Sub className="group text-[13px] font-semibold leading-none text-back rounded-[3px] flex items-center h-[25px]  relative px-[1rem]  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none   hover:bg-accent">
              <EditPost id={id} text={text} />
            </DropdownMenu.Sub>
          ) : null}
          <DropdownMenu.Item className="group text-[13px] font-semibold  leading-none text-back rounded-[3px] flex items-center h-[25px]  relative px-[1rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none   hover:bg-accent ">
            Bookmark Post
          </DropdownMenu.Item>

          {user.id === userId ? (
            <DropdownMenu.Item
              onClick={() => deleteUserPost(id)}
              className="group text-[13px] font-semibold  leading-none text-back rounded-[3px] flex items-center h-[25px]  relative px-[1rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none   hover:bg-red-600 hover:text-white "
            >
              Delete Post
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item className="group text-[13px] font-semibold  leading-none text-back rounded-[3px] flex items-center h-[25px]  relative px-[1rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none   hover:bg-red-600 hover:text-white ">
              Report Post
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PostOptions;
