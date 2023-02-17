import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://circle7.codes/api/v1',
  credentials: 'include',
  headers: {
    'Content-type': 'application/json',
    'Allow-Control-Allow-Credentials': 'true',
  },
});

export default axiosClient;

/**
  credentials: 'include',
  headers : {
   'Allow-Control-Allow-Credentials' : 'true'
  }
 */
