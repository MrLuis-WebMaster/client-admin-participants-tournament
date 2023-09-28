import axios from 'axios';

const serverApi = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
  }
});

export default serverApi;