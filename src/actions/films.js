import * as api from '../api'

export const getPopular = async () => {
    const { data } = await api.getPopular();
    return data.results;
}

export const getByType = async (type) => {
    const { data } = await api.getByType(type);
    return data.results;
}

export const getDetail = async (id) => {
    const { data } = await api.getDetail(id);
    return data;
}

export const getCredits = async (id) => {
    const { data } = await api.getCredits(id);
    return data;
}

export const searchMovie = async (title) => {
    const { data } = await api.searchMovie(title);
    return data.results;
}

export const getWatchProviders = async (id) => {
    const { data }  = await api.getWatchProviders(id);
    return data.results;
}

export const getVideos = async (id) => {
    const {data} = await api.getVideos(id);
    return data.results;
}

export const getReviews = async (id) => {
    const {data} = await api.getReviews(id);
    return data.results;
}