import firebase from "firebase/app";
import CategoryService from "@/services/category.service";

const actions = {
  async fetchCategories({ commit, dispatch }) {
    try {
      const uuid = await dispatch("auth/getUserUuid", null, { root: true });
      const categories =
        (await CategoryService.fetchCategories({ uuid })).val() || {};

      return Object.keys(categories).map(k => ({ ...categories[k], id: k }));
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

      return { ...category, id };
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
      return {
        title,
        limit,
        id: category.key,
      };
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
    } catch (e) {
      commit("errors/SET_ERROR", e, { root: true });
      throw e;
    }
  },
};

export const category = {
  namespaced: true,
  actions,
};
