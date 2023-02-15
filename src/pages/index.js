import Home from '@components/home/Home';
import useHttp from 'src/hooks/use-Auth';

function Homepage() {
  const getResp = (res) => {
    console.log(res);
  };
  // LOGIN AND SIGNUP HANDLERS (CUSTOM HOOK)
  const login = useHttp('/api/users/login', getResp, true);
  const signup = useHttp('/api/users/signup', getResp, false);
  return <Home auth={{ login, signup }} />;
}

export default Homepage;
