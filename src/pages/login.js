import Login from "@components/home/login"
import useHttp from "@hooks/use-Auth"
import { useUserStore } from "@utils/store";
import { useRouter } from "next/router";
import LoadingAnimation from "@components/ui/loading";

function LoginPage() {
  const setUserStore = useUserStore((state) => state.setUserStore);
  const router = useRouter();

  const getResp = (res) => {
    const { data } = res;
    setUserStore(data.token, data.user);
    router.push('/feed');
  };
  const login = useHttp('login', 'POST', getResp);

  return (
    <>
      <LoadingAnimation loadingSpinner={login.isLoading} />
      <Login login={login} />
    </>
  );
}

export default LoginPage