import firebase from "firebase/app";

const state = {
    info: {},
    currency: null
}

const mutations = {
    SET_INFO: (state, info) => state.info = info,
    CLEAR_INFO: (state) => state.info = {},
    SET_CURRENCY: (state, currency) => state.currency = currency
}

const actions = {
    async fetchInfo({dispatch, commit}) {
        try {
           const uid = await dispatch('auth/getUserUuid', null, {root: true});
           const info = (await firebase.database().ref(`users/${uid}/info`).once('value')).val();
           commit('SET_INFO', info)

        } catch(e) {
            commit('errors/SET_ERROR', e, {root: true});
            throw e;
        }
    },

    async fetchCurrency({commit}) {
        try {
            // let key = process.env.VUE_APP_FIXER_API_KEY;
            // await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,JPY`)
            await fetch(` https://api.exchangerate-api.com/v4/latest/EUR`)
                .then(function(response) {
                    return response.json();
                }).then(function(data) {
                    commit('SET_CURRENCY', data)
                });

        } catch(e) {
            console.log(e);
            throw e;
        }
    },

    async updateInfo({ commit, dispatch, state }, payload) {
        try {
            const uid = await dispatch('auth/getUserUuid', null, {root: true});
            const updateData = {
                ...state.info,
                ...payload
            }
            await firebase.database().ref(`/users/${uid}/info`).update(updateData);
            commit('SET_INFO', updateData);
        } catch(e) {
            commit('errors/SET_ERROR', e, {root: true});
            throw e;
        }
    }

}

export const info = {
    namespaced: true,
    state,
    mutations,
    actions
}