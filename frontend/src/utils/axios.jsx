import axios from 'axios'
import dotenv from "dotenv";
dotenv.config();

export const instance = axios.create({
  baseURL: ['http://localhost:3000/api' || `${process.env.REACT_APP_API_URL}/api`],
//   timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default instance