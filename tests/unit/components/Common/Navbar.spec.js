import { createLocalVue, shallowMount } from "@vue/test-utils";
import Navbar from "@/components/Common/Navbar";
import Vue from "vue";
import "materialize-css/dist/js/materialize.min.js";
import dateFilter from "@/filters/date.filter";
import Vuex from "vuex";
Vue.filter("dateFilter", dateFilter);

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Navbar", () => {
  let wrapper;
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      logout: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          actions,
        },
        info: {
          namespaced: true,
          state: {
            info: {
              bill: 695,
              locale: "ru",
              name: "Alla",
            },
          },
        },
      },
    });

    wrapper = shallowMount(Navbar, {
      store,
      localVue,
      propsData: {
        isNavbarOpened: false,
      },
      stubs: ["router-link"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
