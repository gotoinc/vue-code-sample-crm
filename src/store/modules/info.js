import { i18n } from "@/plugins/i18n";
import InfoService from "@/services/info.service";

const state = {
  info: {},
  currency: null,
};

const mutations = {
  SET_INFO: (state, info) => {
    state.info = info;
    i18n.locale = info.locale;
  },
  CLEAR_INFO: state => (state.info = {}),
  SET_CURRENCY: (state, currency) => {
    const { EUR, USD, JPY } = currency.rates;

    state.currency = { ...currency, rates: { EUR, USD, JPY } };
  },
};

const actions = {
  async fetchInfo({ dispatch, commit }) {
    try {
      const uuid = await dispatch("auth/getUserUuid", null, { root: true });
      const info = (await InfoService.fetchUserInfo(uuid)).val();
      commit("SET_INFO", info);
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },

  async fetchCurrency({ commit }) {
    try {
      await InfoService.fetchCurrency()
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          commit("SET_CURRENCY", data);
        });
    } catch (e) {
      throw e;
    }
  },

  async updateInfo({ commit, dispatch, state }, payload) {
    try {
      const uuid = await dispatch("auth/getUserUuid", null, { root: true });
      const updateData = {
        ...state.info,
        ...payload,
      };
      await InfoService.updateUserInfo({ uuid, updateData });
      commit("SET_INFO", updateData);
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },
};

export const info = {
  namespaced: true,
  state,
  mutations,
  actions,
};
