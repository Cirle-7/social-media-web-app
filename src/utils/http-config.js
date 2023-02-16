import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://circle7.codes/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosClient;
