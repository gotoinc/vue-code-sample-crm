import { createLocalVue, shallowMount } from "@vue/test-utils";
import Categories from "@/views/Categories";
import Vue from "vue";
// import Vuex from "vuex";
import localizeFilter from "@/filters/localize.filter";
Vue.filter("localizeFilter", localizeFilter);

// const localVue = createLocalVue();
//
// localVue.use(Vuex);

describe("Categories", () => {
  let wrapper;
  let actions;
  let store;
  beforeEach(() => {
    // actions = {
    //   fetchCategories: jest.fn(),
    // };
    // store = new Vuex.Store({
    //   namespaced: true,
    //   actions,
    // });
    wrapper = shallowMount(Categories, {
      // store,
      // localVue,
      stubs: ["Loader"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
