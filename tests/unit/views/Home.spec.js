import { createLocalVue, shallowMount } from "@vue/test-utils";
import Home from "@/views/Home";
import Vue from "vue";
import currencyFilter from "@/filters/currency.filter";
import Vuex from "vuex";
Vue.filter("currencyFilter", currencyFilter);

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Home", () => {
  let wrapper;
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      fetchCurrency: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        info: {
          namespaced: true,
          actions,
          state: {
            currency: {
              base: "EUR",
              date: "2021-11-16",
              time_last_updated: 1637020802,
              rates: { EUR: 1, USD: 1.15, JPY: 130.25 },
            },
          },
        },
      },
    });

    wrapper = shallowMount(Home, {
      store,
      localVue,
      propsData: {
        records: [],
        passedItems: 1,
      },
      stubs: ["HomeBill", "HomeCurrency", "Loader"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
