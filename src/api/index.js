import axios from "axios";

const API = axios.create({ baseURL: 'https://api.themoviedb.org/3/' });

export const getPopular = () => API.get('/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US');
export const getByType = (type) => API.get(`/movie/${type || "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
export const getDetail = (id) => API.get(`/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
export const getCredits = (id) => API.get(`/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63`);
export const searchMovie = (title) => API.get(`/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${title}`);
export const getWatchProviders = (id) => API.get(`/movie/${id}/watch/providers?api_key=4e44d9029b1270a757cddc766a1bcb63`)