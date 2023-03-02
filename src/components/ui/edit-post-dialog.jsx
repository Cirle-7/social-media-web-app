import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editPost } from '@utils/api-fns/posts';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const EditPost = ({ id, text }) => {
  const [textEdit, setTextEdit] = useState(text);
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: editPost,
    onSuccess: (data) => {
      if (data.status && (data.status === 'error' || data.status === 'Error')) {
        return toast.error('Error editing post');
      }
      toast.success('Post edit successful');
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
    onError: () => {
      toast.error('Error sending post');
    },
  });

  const editUserPost = (id) => {
    editMutation.mutate({
      id,
      textEdit,
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="group text-[13px] font-semibold leading-none text-back rounded-[3px] flex items-center h-[25px]  relative px-[1rem]  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none   hover:bg-accent">
          Edit Post
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-overlay z-20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className=" z-30 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Edit post
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Edit post here. Click &apos;Make Post&apos; when you&apos;re done.
          </Dialog.Description>
          <fieldset className="mb-[15px]">
            <label
              className="text-black w-[90px] text-right text-[15px]"
              htmlFor="text"
            ></label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="text"
              value={textEdit}
              onChange={(e) => setTextEdit(e.target.value)}
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={() => editUserPost(id)}
                className="bg-accent border border-text-accent  hover:bg-text-accent hover:text-white hover:border-accent  focus:shadow-black inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Make Post
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditPost;
