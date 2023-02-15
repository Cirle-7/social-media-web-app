import axios from "axios"

export default async function handler(req, res) {
  const response = await axios.patch('https://circle7.codes/api/v1/users/forgotpassword', req.body)
  const {data} = response.data
  res.status(200).json(data)
}