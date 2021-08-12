import firebase from "firebase/app";

const state = {
    info: {}
}

const mutations = {
    SET_INFO: (state, info) => state.info = info,
    CLEAR_INFO: (state) => state.info = {}
}

const actions = {
    async fetchInfo({dispatch, commit}) {
        try {
           const uid = await dispatch('auth/getUserUuid', null, {root: true});
           const info = (await firebase.database().ref(`users/${uid}/info`).once('value')).val();
           commit('SET_INFO', info)

        } catch(e) {
            console.log(e)
        }
    }
}

export const info = {
    namespaced: true,
    state,
    mutations,
    actions
}