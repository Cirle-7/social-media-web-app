import axiosClient from '@utils/http-config';

export default async function handler(req, res) {
  const { body } = req;

  console.log('bosy', body);
  try {
    await axiosClient
      .post('/users/login', body)
      .then((response) => {
        console.log('response', response);
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        if (error.reponse) {
          console.log('res error:', error.response);
          return res.status(error.reponse.status).json(error.reponse.data);
        } else if (error.request) {
          console.log('req error:', error.response);
          return res.status(400).json(error.request);
        } else {
          console.log('Error', error.message);
          return res.status(404).json(error.message);
        }
      });
  } catch (error) {
    res.status(400).json(error);
  }
}
