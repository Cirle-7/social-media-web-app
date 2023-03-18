import Button from '@components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser, unfollowUser } from '@utils/api-fns/profile';
import { toast } from 'react-hot-toast';

const Follow = ({ username }) => {
  const queryClient = useQueryClient();
  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: (data) => {
      console.log('dataa');
      if (data.status && (data.status === 'error' || data.status === 'Error')) {
        return toast.error('Error saving display name');
      }

      if (data.status === 'success') {
        toast(`Followed ${username}.`);
        return queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      }
    },
    onError: () => {
      toast.error('Try Again');
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: (data) => {
      console.log('dataa');
      if (data.status && (data.status === 'error' || data.status === 'Error')) {
        return toast.error('Error saving display name');
      }

      if (data.status === 'success') {
        toast(`Followed ${username}.`);
        return queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      }
    },
    onError: () => {
      toast.error('Try Again');
    },
  });

  const follow = (username) => {
    return followMutation.mutate(username);
  };

  const unfollow = (username) => {
    return unfollowMutation.mutate(username);
  };

  return (
    <Button
      onClick={() => unfollow(username)}
      className="mt-16 mr-5 md:mr-[3rem] flex justify-end absolute right-0 items-center gap-1
  font-semibold
  border-2 border-black py-0 px-3 rounded-full text-[.9rem]"
    >
      Follow
    </Button>
  );
};

export default Follow;
