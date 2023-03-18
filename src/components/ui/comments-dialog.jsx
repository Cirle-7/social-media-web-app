import * as Dialog from '@radix-ui/react-dialog';
import { ChatBubbleIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeComment } from '@utils/api-fns/posts';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from './button';

const CommentDialog = (props) => {
  const [comment, setCommment] = useState('');

  const queryClient = useQueryClient();
  const commentMutation = useMutation({
    mutationFn: makeComment,
    onSuccess: (data) => {
      if (data.status && (data.status === 'error' || data.status === 'Error')) {
        setCommment('');
        return toast.error('Commenting Failed. Try Again');
      }
      if (data.status === true) {
        setCommment('');
        queryClient.invalidateQueries({
          queryKey: ['userPosts'],
        });
        return toast('Post Sent');
      }
    },
    onError: () => {
      setCommment('');
      return toast.error('Commenting Failed.Try Again');
    },
  });

  const makePostComment = (id, comment) => {
    if (comment.trim().length === 0) return;

    commentMutation.mutate({
      postId: id,
      comment,
    });
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className=" flex items-center gap-1 text-[.95rem] font-medium  leading-none text-back rounded-[3px]  h-[25px] 
         relative px-[1rem] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none
         hover:bg-accent"
        >
          <ChatBubbleIcon /> <span>{props.commentsCount}</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-overlay z-20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className=" z-30 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 font-medium flex items-center gap-1">
            <span className="font-bold">{props.displayName}</span>
            <span className="text-text-accent text-sm">@{props.username} </span>
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            {props.text}
          </Dialog.Description>

          <p className="text-[.8rem]">
            Replying to{' '}
            <span className="text-text-accent cursor-pointer">
              @{props.username}
            </span>{' '}
          </p>
          <fieldset className="mb-[15px]">
            <label
              className="text-black w-[90px] text-right text-[15px]"
              htmlFor="text"
            ></label>
            <textarea
              value={comment}
              onChange={(e) => setCommment(e.target.value)}
              type="text"
              className="focus:bg-accent border-b-2 border-text-accent focus:outline-none"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={() => makePostComment(props.id, comment)}
                disabled={comment.trim().length === 0}
                className="bg-text-accent text-primary focus:shadow-black items-center justify-center rounded-[4px] py-[.4rem] px-3 leading-none focus:shadow-[0_0_0_2px] focus:outline-none
              font-semibold uppercase"
              >
                Reply
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <Button
              className=" hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CommentDialog;
