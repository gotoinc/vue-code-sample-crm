import RecordService from "@/services/record.service";

const actions = {
  async createRecord({ commit, dispatch }, record) {
    try {
      const uuid = await dispatch("auth/getUserUuid", null, { root: true });
      return await RecordService.createRecord({ uuid, record });
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },

  async fetchRecords({ commit, dispatch }) {
    try {
      const uuid = await dispatch("auth/getUserUuid", null, { root: true });
      const records = (await RecordService.fetchRecords({ uuid })).val() || {};
      return Object.keys(records).map(k => ({ ...records[k], id: k }));
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

      return { ...record, id };
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },
};

export const record = {
  namespaced: true,
  actions,
};
