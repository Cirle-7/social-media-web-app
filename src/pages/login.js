import Login from "@components/home/login";
import LoadingAnimation from "@components/ui/loading";
import useHttp from "@hooks/use-Auth";
import StatusMessage from "@ui/statusMessage";
import { useUserStore } from "@utils/store";
import { useRouter } from "next/router";

function LoginPage() {
  const setUserStore = useUserStore((state) => state.setUserStore);
  const router = useRouter();

  const getResp = (res) => {
    const { data } = res;
    setUserStore(data.token, data.user);
    router.push('/feed');
  };
  const login = useHttp('login', 'POST', getResp, 'login');

  return (
    <>
      <LoadingAnimation loadingSpinner={login.isLoading} />
      <Login login={login} />
      <StatusMessage isError={login.isError}>{login.error}</StatusMessage>
    </>
  );
}

export default LoginPage