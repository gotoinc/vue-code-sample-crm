import { createLocalVue, mount } from "@vue/test-utils";
import MainLayout from "@/layouts/MainLayout";
import tooltipDirective from "@/directives/tooltip.directive";
import "materialize-css/dist/js/materialize.min.js";
import Vue from "vue";
import Vuex from "vuex";
Vue.directive("tooltip", tooltipDirective);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuex);

describe("MainLayout", () => {
  let wrapper;
  let getters;
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      fetchInfo: jest.fn(),
    };
    getters = {
      GET_ERROR: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        info: {
          namespaced: true,
          actions,
          state: {
            info: {
              bill: 695,
              locale: "ru",
              name: "Alla",
            },
          },
        },
        errors: {
          namespaced: true,
          getters,
        },
      },
    });

    wrapper = mount(MainLayout, {
      store,
      localVue,
      stubs: ["router-view", "router-link", "Navbar", "Sidebar", "Loader"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
