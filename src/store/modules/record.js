import firebase from 'firebase/app';

const actions = {
	async createRecord({commit, dispatch}, record) {
		try {
			const uid = await dispatch('auth/getUserUuid', null, {root: true});
			return await firebase.database().ref(`/users/${uid}/records`).push(record);
		} catch (e) {
			commit('errors/SET_ERROR', e, {root: true});
			throw e;
		}
	},
	
	async fetchRecords({commit, dispatch}){
		try {
			const uid = await dispatch('auth/getUserUuid', null, {root: true});
			const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
			
			return Object.keys(records).map(k => ({ ...records[k], id: k }));
		} catch (e) {
			commit('errors/SET_ERROR', e, {root: true});
			throw e;
		}
	},
	
	async fetchRecord({commit, dispatch}, id){
		try {
			const uid = await dispatch('auth/getUserUuid', null, {root: true});
			const record = (await firebase.database().ref(`/users/${uid}/records/`).child(id).once('value')).val() || {};
			
			return {...record, id};
		} catch (e) {
			commit('errors/SET_ERROR', e, {root: true});
			throw e;
		}
	}
}

export const record = {
	namespaced: true,
	actions,
}