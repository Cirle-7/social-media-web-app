import axios from 'axios';
import { useRouter } from 'next/router';

const useHttp = (url, getResponse, push = false) => {
  const router = useRouter();
  const postRequest = async (data) => {
    try {
      const response = await axios.post(url, data);
      getResponse(response);
      if (push === true) router.push('/feed');
    } catch (error) {
      console.log(error);
    }
  };
  return { postRequest };
};

export default useHttp;
