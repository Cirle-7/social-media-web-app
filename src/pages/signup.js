import SignUp from '@components/home/signUp';
import LoadingAnimation from '@ui/loading';
import useHttp from '@hooks/use-Auth';
import { useUserStore } from '@utils/store';
import { useRouter } from 'next/router';
import StatusMessage from '@ui/statusMessage';

function SignupPage() {
  const setUserStore = useUserStore((state) => state.setUserStore);
  const router = useRouter();

  const getResp = (res) => {
    const { data } = res;
    setUserStore(data.token, data.user);
    router.push('/feed');
  };

  const signup = useHttp('signup', 'POST', getResp, 'signup');

  return (
    <>
      <LoadingAnimation loadingSpinner={signup.isLoading} />
      <SignUp signup={signup} />
      <StatusMessage isError={signup.isError}>{signup.error}</StatusMessage>
    </>
  );
}

export default SignupPage;
