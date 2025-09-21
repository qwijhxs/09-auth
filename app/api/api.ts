import axios from 'axios';

const baseURL = 'https://ac.goit.global/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});