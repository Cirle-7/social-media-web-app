import { useUserStore } from '@utils/store';
import { useEffect, useState } from 'react';

export function useUser() {
  const userStore = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const setUserStore = useUserStore((state) => state.setUserStore);
  const resetUserStore = useUserStore((state) => state.resetUserStore);

  /** because zustand is using localStorage to persist &
       SSR pages cant't access localSstorage, 
       useEffect is used to only load the details from localSrorage client-side rather than server-side
       */
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(userStore);
  }, [userStore]);

  return { user, token, setUserStore, resetUserStore };
}
