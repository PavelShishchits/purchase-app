import axios from 'axios';
import {apiKey} from '@/helpers/index';

export default {
    namespaced: true,
    state: {
        tokenId: null,
        userId: null
    },
    mutations: {
        'AUTH_USER'(state, payload) {
            state.tokenId = payload.tokenId;
            state.userId = payload.userId;
        },
        'LOG_OUT'(state) {
            state.tokenId = null;
            state.userId = null;
        }
    },
    actions: {
        signUp({commit, dispatch}, payload) {
            return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                ...payload,
                returnSecureToken: true
            })
                .then((response ) => {
                    const {data} = response;
                    commit('AUTH_USER', {
                        tokenId: data.idToken,
                        userId: data.localId
                    });
                    dispatch('cacheAuthData', data);
                    dispatch('setAutoLogout', data.expiresIn);
                })
        },
        cacheAuthData(context, authData) {
            const now = new Date();
            const expirationDate = new Date(now.getTime() + authData.expiresIn * 1000);
            localStorage.setItem('authData', JSON.stringify({
                'tokenId': authData.tokenId,
                'userId': authData.userId,
                'expirationTime': expirationDate
            }))
        },
        setAutoLogout({commit}, expirationTime) {
            setTimeout(() => {
                commit('LOG_OUT');
            }, expirationTime * 1000)
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.tokenId !== null;
        }
    }
}