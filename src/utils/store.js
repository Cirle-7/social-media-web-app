import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  displayName: null,
  email: null,
  githubId: null,
  googleId: null,
  id: 0,
  username: null,
};

export const useUserStore = create(
  persist(
    (set) => ({
      user: initialState,
      setUserStore: (data) =>
        set((state) => ({
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
