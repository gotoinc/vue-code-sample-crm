import { createLocalVue, shallowMount } from "@vue/test-utils";
import CategoryCreate from "@/components/CategoryCreate";
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

describe("CategoryCreate", () => {
  let wrapper;
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      createCategory: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        category: {
          namespaced: true,
          actions,
        },
      },
    });
    wrapper = shallowMount(CategoryCreate, {
      store,
      localVue,
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("check input data", async () => {
    await wrapper.find("#name-inp").setValue("Category name");
    await wrapper.find("#limit").setValue(500);
    await wrapper.find("form").trigger("submit.prevent");
    // await wrapper.vm.$nextTick();
    expect(wrapper.find(".helper-text.invalid").exists()).toBeFalsy();
    await wrapper.find("#name-inp").setValue("");
    await wrapper.find("#limit").setValue(500);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeTruthy();

    await wrapper.find("#name-inp").setValue("Category name");
    await wrapper.find("#limit").setValue(50);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeTruthy();
  });
});
