import { useEffect, useState } from 'react';

const useHttp = (url, method, getResponse, type) => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timeout =  setTimeout(()=>{
      setIsError(false)
      setError('')
    }, 3000)
    return () => clearTimeout(timeout)
  }, [error, isError])

  const postRequest = async (data) => {
    setIsLoading(true);
    try {
      await fetch(`https://www.circle7.codes/api/v1/users/${url}`, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'Success' || data.status === 'success') {
            const response = data;

            type !== 'passwordReset'? document.cookie = `token=${response.data.token}` : '';
            getResponse(response);
            setIsError(true)
            type === 'passwordReset'? setError('Token has been sent to your email') : type === 'signup'? setError('Signup was successful') : type === 'login'? setError('Logged in successfully') : '';
          }

          if (data.status === 'Fail') {
            setIsError(true);

            type === 'login'? setError('Email or password is incorrect') : type === 'signup'? setError('This user already exists') : type === 'passwordReset'? setError('something went wrong') : '';
          }
        });
    } catch (error) {
      if (error.response) {
        console.log('err.res', { error: error.response });
      } else if (error.request) {
        console.log('err.req', { error: error.request });
      } else if (error.message) {
        console.log('err.msg', { error });
        setIsError(true)
        setError('Unable to execute request!')
      }
    }

    setIsLoading(false);
  };
  return { postRequest, isLoading, isError, error };
};

export default useHttp;
