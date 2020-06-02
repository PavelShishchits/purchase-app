import axios from 'axios';
import router from '@/router/index';
import {apiKey} from '@/helpers/index';
import Cookie from 'js-cookie';

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
        signIn({commit, dispatch}, payload) {
            return axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
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
            Cookie.set('tokenId', authData.idToken);
            Cookie.set('userId', authData.localId);
            Cookie.set('expirationTime', expirationDate.getTime());
        },
        autoLogin({commit}) {
            let tokenId = Cookie.get('tokenId');
            let userId = Cookie.get('userId');
            let expirationTime = Cookie.get('expirationTime');
            if (!tokenId || !userId || !expirationTime) {
                return;
            }
            if (new Date().getTime() >= +expirationTime) {
                return;
            }
            commit('AUTH_USER', {
                tokenId: tokenId,
                userId: userId
            });
        },
        setAutoLogout({commit}, expirationTime) {
            setTimeout(() => {
                commit('LOG_OUT');
            }, expirationTime * 1000)
        },
        logOut({commit}) {
            commit('LOG_OUT');
            localStorage.setItem('authData', null);
            router.replace({name: 'Home'})
        }
    },
    getters: {
        isAuthenticated: (state)  => state.tokenId !== null
    }
}