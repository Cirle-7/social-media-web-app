import axios from 'axios';

export default async function handler(req, res) {
  const { body } = req;
  try {
    await axios
      .post('https://www.circle7.codes/api/v1/users/login', body)
      .then((response) => {
        return res.status(200).json(response.data);
      })
      .catch((error) => {
        if (error.reponse) {
          return res.status(error.reponse.status).json(error.reponse.data);
        } else if (error.request) {
          // console.log('req:', error.request);
          return res.status(400).json(error.request);
        } else {
          // console.log('Error', error.message);
          return res.status(404).json(error.message);
        }
      });
  } catch (error) {
    res.status(400).json(error);
  }
}
