import { useUserStore } from '@utils/store';

export function useUser() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const setUserStore = useUserStore((state) => state.setUserStore);
  const resetUserStore = useUserStore((state) => state.resetUserStore);

  return { user, token, setUserStore, resetUserStore };
}
