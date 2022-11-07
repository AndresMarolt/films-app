import axios from "axios";

const API = axios.create({ baseURL: 'https://api.themoviedb.org/3/movie' });

export const getPopular = () => API.get('/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US');
export const getByType = (type) => API.get(`/${type || "o"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
export const getDetail = (id) => API.get(`/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
