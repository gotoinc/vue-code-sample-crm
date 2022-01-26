import AuthService from "@/services/auth.service";

const state = {
  isLogged: false,
};

const mutations = {
  SET_IS_AUTHORIZED: (state, value) => (state.isLogged = value),
};

const actions = {
  async login({ commit }, { email, password }) {
    try {
      await AuthService.login({ email, password });
      commit("SET_IS_AUTHORIZED", true);
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },

  async logout({ commit }) {
    try {
      await AuthService.logout();
      commit("info/CLEAR_INFO", null, { root: true });
      commit("SET_IS_AUTHORIZED", false);
    } catch (e) {
      throw e;
    }
  },

  async signUp({ dispatch, commit }, { email, password, name }) {
    try {
      await AuthService.signUp({ email, password });
      const uuid = await dispatch("getUserUuid");
      await AuthService.setInitialUserData({ uuid, name });
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },

  async getUserUuid() {
    let user = await AuthService.getCurrentUser();
    return user ? user.uid : null;
  },
};

export const auth = {
  namespaced: true,
  state,
  mutations,
  actions,
};
