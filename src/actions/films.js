import * as api from '../api'

export const getPopular = async () => {
    const { data } = await api.getPopular();
    console.log(data);
    return data.results;
}

export const getByType = async (type) => {
    const { data } = await api.getByType(type);
    return data.results;
}

export const getDetail = async (id) => {
    const { data } = await api.getDetail(id);
    console.log(data);
    return data;
}