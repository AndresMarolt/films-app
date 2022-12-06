import * as api from '../api'

export const searchPersonByName = async (id) => {
    const {data} = await api.searchPersonByName(id);
    return data.results;
}

export const getPersonInfo = async (id) => {
    const {data} = await api.getPersonInfo(id);
    return data;
}
