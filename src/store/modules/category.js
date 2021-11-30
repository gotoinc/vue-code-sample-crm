import firebase from "firebase/app";
import CategoryService from "@/services/category.service";

const state = {
  categories: [],
  currentCategory: null,
  updateCount: 0,
};

const mutations = {
  SET_CATEGORIES: (state, categories) => {
    state.categories = Object.keys(categories).map(k => ({
      ...categories[k],
      id: k,
    }));
  },
  SET_CURRENT_CATEGORY: (state, category) => (state.currentCategory = category),
  UPDATE_CATEGORY: (state, category) => {
    const idx = state.categories.findIndex(c => c.id === category.id);
    state.categories[idx].title = category.title;
    state.categories[idx].limit = category.limit;
    state.updateCount++;
  },
  ADD_CATEGORY: (state, category) => state.categories.push(category),
};

const actions = {
  async fetchCategories({ commit, dispatch }) {
    try {
      const uuid = await dispatch("auth/getUserUuid", null, { root: true });
      const categories =
        (await CategoryService.fetchCategories({ uuid })).val() || {};
      commit("SET_CATEGORIES", categories);
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },

  async fetchCategory({ commit, dispatch }, id) {
    try {
      const uid = await dispatch("auth/getUserUuid", null, { root: true });
      const category =
        (
          await firebase
            .database()
            .ref(`/users/${uid}/categories`)
            .child(id)
            .once("value")
        ).val() || {};
      commit("SET_CURRENT_CATEGORY", { ...category, id });
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },

  async createCategory({ commit, dispatch }, { title, limit }) {
    try {
      const uid = await dispatch("auth/getUserUuid", null, { root: true });
      const category = await firebase
        .database()
        .ref(`/users/${uid}/categories`)
        .push({ title, limit });
      commit("ADD_CATEGORY", {
        title,
        limit,
        id: category.key,
      });
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },

  async updateCategory({ commit, dispatch }, { id, title, limit }) {
    try {
      const uid = await dispatch("auth/getUserUuid", null, { root: true });
      await firebase
        .database()
        .ref(`/users/${uid}/categories`)
        .child(id)
        .update({ title, limit });
      commit("UPDATE_CATEGORY", { id, title, limit });
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },
};

export const category = {
  namespaced: true,
  state,
  mutations,
  actions,
};
