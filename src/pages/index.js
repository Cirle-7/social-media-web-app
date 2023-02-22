import Home from '@components/home/Home';
import useHttp from '@hooks/use-Auth';
import LoadingAnimation from '@ui/loading';
import { useUserStore } from '@utils/store';
import { useRouter } from 'next/router';

function Homepage() {
  const setUserStore = useUserStore((state) => state.setUserStore);
  const router = useRouter();

  const getResp = (res) => {
    const { data } = res;
    setUserStore(data.token, data.user);
    router.push('/feed');
  };

  // LOGIN AND SIGNUP HANDLERS (CUSTOM HOOK)
  const login = useHttp('login', 'POST', getResp);
  const signup = useHttp('signup', 'POST', getResp);

  return (
    <>
      <Home auth={{ login, signup }} />
      <LoadingAnimation loadingSpinner={login.isLoading || signup.isLoading} />
    </>
  );
}

export default Homepage;
