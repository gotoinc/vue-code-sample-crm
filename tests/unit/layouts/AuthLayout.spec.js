import { createLocalVue, mount } from "@vue/test-utils";
import AuthLayout from "@/layouts/AuthLayout";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("AuthLayout", () => {
  let wrapper;
  let getters;
  let store;
  beforeEach(() => {
    getters = {
      GET_ERROR: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        errors: {
          namespaced: true,
          getters,
        },
      },
    });

    wrapper = mount(AuthLayout, {
      store,
      localVue,
      stubs: ["router-view"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
