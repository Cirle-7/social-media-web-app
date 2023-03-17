import Button from '@components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, Pencil2Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDisplayName, editProfile } from '@utils/api-fns/profile';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const EditProfile = ({ id, profile }) => {
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [profileEdit, setProfileEdit] = useState({
    bio: profile.Bio,
    website: profile.website,
    location: profile.location,
    github_link: profile.github_link,
    twitter_link: profile.twitter_link,
    avatar: '',
    header: '',
  });

  const editDisplayNameMutation = useMutation({
    mutationFn: editDisplayName,
    onSuccess: (data) => {
      if (data.status && (data.status === 'error' || data.status === 'Error')) {
        return toast.error('Error saving display name');
      }
      if (data.status === 'Success') {
        return queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      }
    },
    onError: () => {
      toast.error('Error sending post');
    },
  });

  const editUserDisplayName = () => {
    if (displayName.trim().length === 0 || id === 0) return;
    editDisplayNameMutation.mutate({
      userId: id,
      displayName,
    });
  };

  const editProfileMutation = useMutation({
    mutationFn: editProfile,
    onSuccess: (data) => {
      if (data.status && (data.status === 'error' || data.status === 'Error')) {
        return toast.error('Error editing profile');
      }

      if (data.status === true) {
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        return toast.success('Profile Updated.');
      }
    },
    onError: () => {
      toast.error('Profile Update Failed.');
    },
  });

  const editUserProfile = () => {
    if (id === 0) return;
    editProfileMutation.mutate({
      profileId: profile.id,
      profileEdit,
    });
  };

  const saveChanges = () => {
    editUserDisplayName();
    editUserProfile();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          className="mt-16 mr-5 md:mr-[3rem] flex justify-end absolute right-0 items-center gap-1 font-medium
              border border-text-accent py-1 px-2 rounded-full text-[.9rem]"
        >
          <Pencil2Icon width={20} height={20} />
          Edit Profile
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-overlay z-20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className=" z-30 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[90vw] md:max-w-[45vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className=" m-0 text-[17px] font-semibold">
            Edit profile
          </Dialog.Title>
          <Dialog.Description className=" mt-[10px] mb-5 text-[15px] leading-normal">
            Make changes to your profile details here. Click save when
            you&apos;re done.
          </Dialog.Description>
          <fieldset className="mb-[15px] grid gap-2">
            <label className=" font-semibold text-[15px]" htmlFor="username">
              Display Name
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </fieldset>
          <fieldset className="mb-[15px] grid gap-2">
            <label className="font-semibold text-[15px]" htmlFor="bio">
              Bio
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="bio"
              placeholder="Something about you"
              value={profileEdit.Bio}
              onChange={(e) =>
                setProfileEdit({
                  ...profileEdit,
                  Bio: e.target.value,
                })
              }
            />
          </fieldset>
          <fieldset className="mb-[15px] grid gap-2">
            <label className="font-semibold text-[15px]" htmlFor="bio">
              Location
            </label>
            <input
              value={profileEdit.location}
              onChange={(e) =>
                setProfileEdit({ ...profileEdit, location: e.target.value })
              }
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="location"
              placeholder="Location"
            />
          </fieldset>
          <section className="grid md:flex gap-1">
            <fieldset className="mb-[15px] grid gap-2">
              <label className="font-semibold text-[15px]" htmlFor="bio">
                Github
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="github"
                value={profileEdit.github_link}
                onChange={(e) =>
                  setProfileEdit({
                    ...profileEdit,
                    github_link: e.target.value,
                  })
                }
                placeholder="https://github.com/<username>"
              />
            </fieldset>

            <fieldset className="mb-[15px] grid gap-3">
              <label className="font-semibold text-[15px]" htmlFor="bio">
                Twitter
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="twitter"
                value={profileEdit.twitter_link}
                onChange={(e) =>
                  setProfileEdit({
                    ...profileEdit,
                    twitter_link: e.target.value,
                  })
                }
                placeholder="https://twitter.com/<username>"
              />
            </fieldset>
          </section>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={saveChanges}
                className="bg-text-accent text-primary font-semibold  inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="  focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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

export default EditProfile;
