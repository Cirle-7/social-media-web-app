import { useState } from 'react';

const useHttp = (url, method, getResponse) => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

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
          if (data.status === 'Success') {
            const response = data;
            document.cookie = `token=${data.data.token}`;
            getResponse(response);
          }

          if (data.status === 'Fail') {
            setIsError(true);
            setError(data);
          }
        });
    } catch (error) {
      if (error.reponse) {
        console.log('err.res', { error: error.response });
      } else if (error.request) {
        console.log('err.req', { error: error.request });
      } else if (error.message) {
        console.log('err.msg', { error });
      }
    }

    setIsLoading(false);
  };
  return { postRequest, isLoading, isError, error };
};

export default useHttp;
