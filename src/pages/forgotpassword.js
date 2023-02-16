import Password from "@components/home/password";
import useHttp from "@hooks/use-Auth";

function ForgotPassword() {
  const getResponse = (res) => {
    console.log(res)
  }

  // FROM CUSTOM HOOK
  const passwordReset = useHttp('/api/users/forgotpassword', getResponse, false)
  return <Password passwordReset={passwordReset} />;
}

export default ForgotPassword;
