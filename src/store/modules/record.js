import firebase from 'firebase/app';

const actions = {
    async createRecord({commit, dispatch}, record) {
        try {
            const uid = await dispatch('auth/getUserUuid', null, {root: true});
            return await firebase.database().ref(`/users/${uid}/records`).push(record);
        } catch (e) {
            commit('errors/SET_ERROR', e, {root: true})
            throw e;
        }
    }
}

export const record = {
    namespaced: true,
    actions
}