import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      'https://circle7.codes/api/v1/users/login',
      req.body
    );
    const { data } = response.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
