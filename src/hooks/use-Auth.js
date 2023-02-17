import { useRouter } from 'next/router';

const useHttp = (url, getResponse, push = false) => {
  const router = useRouter();
  const postRequest = async (data) => {
    console.log({ data });
    try {
      // const response = await axios.post(
      //   'https://www.circle7.codes/api/v1/users/login',
      //   data,
      //   {
      //     withCredentials: true,
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Allow-Control-Allow-Credentials': 'true',
      //     },
      //   }
      // );
      // getResponse(response);
      // console.log({ response });
      // getResponse(response);

      await fetch('https://www.circle7.codes/api/v1/users/login', {
        method: 'POST',
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
  };
  return { postRequest };
};

export default useHttp;
