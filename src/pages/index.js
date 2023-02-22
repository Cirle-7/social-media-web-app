import Home from '@components/home/Home';
import useHttp from '@hooks/use-Auth';
import LoadingAnimation from '@ui/loading';
import { useUserStore } from '@utils/store';

function Homepage() {
  const setUserStore = useUserStore((state) => state.setUserStore);

  const getResp = (res) => {
    const { data } = res;
    console.log('returned token', data.token);
    setUserStore(data.token, data.user);
  };

  // LOGIN AND SIGNUP HANDLERS (CUSTOM HOOK)
  const login = useHttp('login', 'POST', getResp, true);
  const signup = useHttp('signup', 'POST', getResp, true);

  return (
    <>
      <Home auth={{ login, signup }} />
      <LoadingAnimation loadingSpinner={login.isLoading || signup.isLoading } />
    </>
  );
}

export default Homepage;
