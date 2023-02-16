import Home from '@components/home/Home';
import useHttp from '@hooks/use-Auth';
import { useUserStore } from '@utils/store';

function Homepage() {
  const setUserStore = useUserStore((state) => state.setUserStore);

  const getResp = (res) => {
    const { data } = res.data;
    setUserStore(data.user);
  };

  // LOGIN AND SIGNUP HANDLERS (CUSTOM HOOK)
  const login = useHttp('/api/users/login', getResp, true);
  const signup = useHttp('/api/users/signup', getResp, false);
  return <Home auth={{ login, signup }} />;
}

export default Homepage;
