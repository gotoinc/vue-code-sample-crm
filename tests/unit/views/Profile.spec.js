import { createLocalVue, shallowMount } from "@vue/test-utils";
import Profile from "@/views/Profile";
import Vue from "vue";
import Vuex from "vuex";
import "materialize-css/dist/js/materialize.min.js";
import localizeFilter from "@/filters/localize.filter";
import Vuelidate from "vuelidate";
import messagePlugin from "@/utils/message.plugin";
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter("localizeFilter", localizeFilter);

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Profile", () => {
  let wrapper;
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      updateInfo: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        info: {
          namespaced: true,
          actions,
        },
      },
    });
    wrapper = shallowMount(Profile, {
      store,
      localVue,
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
