import Password from '@components/home/password';
import useHttp from '@hooks/use-Auth';
import LoadingAnimation from '@ui/loading';
import StatusMessage from '@ui/statusMessage';

function ForgotPassword() {
  const getResponse = (res) => {
    console.log(res);
  };

  // FROM CUSTOM HOOK
  const passwordReset = useHttp(
    'forgotpassword',
    'PATCH',
    getResponse,
    'passwordReset'
  );
  return (
    <>
      <Password passwordReset={passwordReset} />;
      <LoadingAnimation loadingSpinner={passwordReset.isLoading} />
      <StatusMessage isError={passwordReset.isError}>
        {passwordReset.error}
      </StatusMessage>
    </>
  );
}

export default ForgotPassword;
