import * as api from '../api'

export const auth = async (formData) => {
    try {
        // GENERATE REQUEST TOKEN
        const {data} = await api.requestToken();
        const req_body = {...formData, request_token: data.request_token};
    
        // APPROVE REQUEST TOKEN
        const approvedToken = await approveToken(req_body);
        
        // GET SESSION ID
        const sessionId = await getSessionId({request_token: approvedToken.request_token});
        
        // GET ACCOUNT DETAILS
        const accountDetails = await getUserInfo(sessionId);

        localStorage.setItem('user', JSON.stringify({accountDetails, sessionId}))

        return sessionId;
    } catch(error) {
        console.log(error);
    }
}

const approveToken = async (req_body) => {
    try {
        const {data} = await api.approveToken(req_body);
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getSessionId = async (obj) => {
    try {
        const {data} = await api.getSessionId(obj);
        return data.session_id;
    } catch(error) {
        console.log(error);
    }
}

export const getUserInfo = async (sessionId) => {
    try {
        const {data} = await api.getUser(sessionId);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export const getFavorites = async (accountId, sessionId) => {
    try {
        const {data} = await api.getFavorites(accountId, sessionId);
        return data.results;
    } catch(error) {
        console.log(error);
    }
}

export const postFav = async (accountId, sessionId, postBody) => {
    try {
        const {data} = await api.postFav(accountId, sessionId, postBody);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export const postRating = async (movieId, sessionId, rating) => {
    try {
        const {data} = await api.postRating(movieId, sessionId, {value: rating});
        return data;
    } catch(error) {
        console.log(error);
    }
}

export const getWatchlist = async (accountId, sessionId) => {
    try {
        const {data} = await api.getWatchlist(accountId, sessionId);
        return data.results;
    } catch(error) {
        console.log(error);
    }
}

export const postToWatchlist = async (accountId, sessionId, postBody) => {
    try {
        const {data} = await api.postToWatchlist(accountId, sessionId, postBody);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export const getRatedMovies = async (accountId, sessionId) => {
    try {
        const {data} = await api.getRatedMovies(accountId, sessionId);
        return data.results;
    } catch(error) {
        console.log(error);
    }
}

export const deleteSession = async (sessionId) => {
    const {data} = await api.deleteSession(sessionId);
    localStorage.removeItem('user');
    return data;
}