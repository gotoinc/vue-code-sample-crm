const state = {
  error: null,
};

const mutations = {
  SET_ERROR: (state, error) => (state.error = error),
  CLEAR_ERROR: state => (state.error = null),
};

const getters = {
  GET_ERROR: state => state.error,
};

export const errors = {
  namespaced: true,
  state,
  mutations,
  getters,
};
