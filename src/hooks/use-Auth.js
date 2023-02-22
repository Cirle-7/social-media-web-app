import { useRouter } from 'next/router';
import { useState } from 'react';

const useHttp = (url, method, getResponse, push = false) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(null);
  const postRequest = async (data) => {
    setIsLoading(true);
    console.log({ data });
    try {
      await fetch(`https://www.circle7.codes/api/v1/users/${url}`, {
        method: method,
        credentials: 'include',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data);
          getResponse(data);
        });

      if (push === true) router.push('/feed');
    } catch (error) {
      if (error.reponse) {
        console.log({ error: error.response });
      } else if (error.request) {
        console.log({ error: error.request });
      } else if (error.message) {
        console.log({ error });
      }
    }
    setIsLoading(false);
  };
  return { postRequest, isLoading };
};

export default useHttp;
