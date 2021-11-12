import { createLocalVue, shallowMount } from "@vue/test-utils";
import Categories from "@/views/Categories";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Categories", () => {
  let wrapper;
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      fetchCategories: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        category: {
          namespaced: true,
          actions,
        },
      },
    });
    wrapper = shallowMount(Categories, {
      store,
      localVue,
      stubs: ["Loader"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
