import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  token: '',
  user: {
    displayName: null,
    email: null,
    githubId: null,
    googleId: null,
    id: 0,
    username: null,
  },
};

export const useUserStore = create(
  persist(
    (set) => ({
      user: initialState,
      setUserStore: (token, data) =>
        set((state) => ({
          token: token,
          user: {
            displayName: data.displayName,
            email: data.email,
            githubId: data.githubId,
            id: data.id,
            username: data.username,
          },
        })),
      resetUserStore: () => set(initialState),
    }),
    {
      name: 'user-details',
    }
  )
);
