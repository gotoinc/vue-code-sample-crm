import RecordService from "@/services/record.service";

const state = {
  records: [],
  currentRecord: null,
};

const mutations = {
  SET_RECORDS: (state, records) => {
    state.records = Object.keys(records).map(k => ({ ...records[k], id: k }));
  },
  SET_CURRENT_RECORD: (state, record) => (state.currentRecord = record),
  ADD_RECORD: (state, record) => state.records.push(record)
};

const actions = {
  async createRecord({ commit, dispatch }, record) {
    try {
      const uuid = await dispatch("auth/getUserUuid", null, { root: true });
      await RecordService.createRecord({ uuid, record });
      commit("ADD_RECORD", record);
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },

  async fetchRecords({ commit, dispatch }) {
    try {
      const uuid = await dispatch("auth/getUserUuid", null, { root: true });
      const records = (await RecordService.fetchRecords({ uuid })).val() || {};
      commit("SET_RECORDS", records);
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },

  async fetchRecord({ commit, dispatch }, id) {
    try {
      const uuid = await dispatch("auth/getUserUuid", null, { root: true });
      const record =
        (await RecordService.fetchRecord({ uuid, id })).val() || {};
      commit("SET_CURRENT_RECORD", { ...record, id });
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },
};

export const record = {
  namespaced: true,
  state,
  mutations,
  actions,
};
