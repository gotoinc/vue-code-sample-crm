import { createLocalVue, shallowMount } from "@vue/test-utils";
import Planning from "@/views/Planning";
import Vue from "vue";
import { nextTick } from "vue";
import VueRouter from "vue-router";
import { routes } from "@/router";
import Vuex from "vuex";
import { info } from "@/store/modules/info";
import "materialize-css/dist/js/materialize.min.js";
import Vuelidate from "vuelidate";
import messagePlugin from "@/utils/message.plugin";
Vue.use(Vuelidate);
Vue.use(messagePlugin);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("Planning", () => {
  let wrapper;
  let actionsCategory;
  let actionsRecord;
  let store;

  beforeEach(() => {
    actionsCategory = {
      fetchCategories: jest.fn(() => Promise.resolve()),
    };
    actionsRecord = {
      fetchRecords: jest.fn(() => Promise.resolve()),
    };
    store = new Vuex.Store({
      modules: {
        info,
        category: {
          namespaced: true,
          actions: actionsCategory,
        },
        record: {
          namespaced: true,
          actions: actionsRecord,
        },
      },
    });
    store.dispatch = jest.fn().mockImplementation(() => Promise.resolve());

    const router = new VueRouter({ routes });

    wrapper = shallowMount(Planning, {
      store,
      localVue,
      router,
      stubs: ["Loader"],
    });
  });

  it("check that component was rendered", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  // it("check if data fetched", async () => {
  //   expect(store.dispatch).toHaveBeenCalledWith("category/fetchCategories");
  //   expect(store.dispatch).toHaveBeenCalledWith("record/fetchRecords");
  // });
});
