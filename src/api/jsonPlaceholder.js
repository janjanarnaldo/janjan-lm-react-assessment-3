import axios from 'axios';

const jsonPlaceholder = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com/',
  headers: {
    common: {
      Accept: 'application/json, *.*', 'Content-Type': 'application/json',
    },
  },
});

jsonPlaceholder.interceptors.request.use(config => config, error => Promise.reject(error));

export default jsonPlaceholder;
