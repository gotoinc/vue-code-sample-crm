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
            commit('errors/SET_ERROR', e, {root: true})
            throw e;
        }
    },

    async logout({commit}) {
        try {
            await firebase.auth().signOut();
            commit('SET_IS_AUTHORIZED', false);
        } catch(e) {
            console.log(e);
            throw e;
        }
    },

    async signUp({dispatch, commit}, {email, password, name}) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const uuid = await dispatch('getUserUuid');
            await firebase.database().ref(`/users/${uuid}/info`).set({
                bill: 100000,
                name,

            })
        } catch (e) {
            commit('errors/SET_ERROR', e, {root: true});
            throw e;
        }
    },

    getUserUuid() {
       let user =  firebase.auth().currentUser;
       return user ? user.uid : null;
    }
};

export const auth = {
    namespaced: true,
    state,
    mutations,
    actions
}