import firebase from "firebase/app";

const state = {
    isLogged: false
};

const mutations = {
    SET_IS_AUTHORIZED: (state, value) => state.isLogged = value,
};

const actions = {
    async login({commit}, {email, password}) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            commit('SET_IS_AUTHORIZED', true);
        } catch(e) {
            console.log(e);
            throw e
        }
    }
};

export const auth = {
    namespaced: true,
    state,
    mutations,
    actions
}