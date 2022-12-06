import axios from "axios";

const API = axios.create({ baseURL: 'https://api.themoviedb.org/3/'});
const API_KEY = process.env.REACT_APP_apiKey

// MOVIES DATA
export const getPopular = () => API.get(`/movie/popular?api_key=${API_KEY}&language=en-US`);
export const getByType = (type) => API.get(`/movie/${type || "popular"}?api_key=${API_KEY}&language=en-US`);
export const getDetail = (id) => API.get(`/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=similar`);
export const getCredits = (id) => API.get(`/movie/${id}/credits?api_key=${API_KEY}`);
export const searchMovie = (title) => API.get(`/search/movie?api_key=${API_KEY}&query=${title}`);
export const getWatchProviders = (id) => API.get(`/movie/${id}/watch/providers?api_key=${API_KEY}`);
export const getVideos = (id) => API.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
export const getReviews = (id) => API.get(`/movie/${id}/reviews?api_key=${API_KEY}`);

// ACTORS AND CREW DATA
export const getPersonInfo = (id) => API.get(`/person/${id}?api_key=${API_KEY}&append_to_response=credits`);
export const searchPersonByName = (name) => API.get(`/search/person?api_key=${API_KEY}&query=${name}`);

// USER
export const requestToken = () => API.get(`/authentication/token/new?api_key=${API_KEY}`);
export const approveToken = (credentials) => API.post(`authentication/token/validate_with_login?api_key=${API_KEY}`, credentials);
export const getSessionId = (request_token) => API.post(`/authentication/session/new?api_key=${API_KEY}`, request_token);
export const deleteSession = (session_id) => API.delete(`/authentication/session?api_key=${API_KEY}&session_id=${session_id}`);

export const getUser = (sessionId) => API.get(`/account?api_key=${API_KEY}&session_id=${sessionId}`);
export const getFavorites = (accountId, sessionId) => API.get(`/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`);
export const postFav = (accountId, sessionId, postBody) => API.post(`/account/${accountId}/favorite?session_id=${sessionId}&api_key=${API_KEY}`, postBody);
export const postRating = (movieId, sessionId, rating) => API.post(`/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`, rating);
export const getWatchlist = (accountId, sessionId) => API.get(`/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`)
export const postToWatchlist = (accountId, sessionId, postBody) => API.post(`/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`, postBody);
export const getRatedMovies = (accountId, sessionId) => API.get(`/account/${accountId}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`)