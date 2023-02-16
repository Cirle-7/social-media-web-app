import axios from 'axios';
import { useRouter } from 'next/router';

const useHttp = (url, getResponse, push = false) => {
  const router = useRouter();
  const postRequest = async (data) => {
    try {
      const response = await axios.post(url, data);
      console.log({ response });
      getResponse(response);
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
