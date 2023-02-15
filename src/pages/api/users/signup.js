import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      'https://circle7.codes/api/v1/users/signup',
      req.body
    );
    const { data } = response.data;
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json(error.data);
  }
}
