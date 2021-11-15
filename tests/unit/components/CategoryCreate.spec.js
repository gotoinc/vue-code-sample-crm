import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import CategoryCreate from "@/components/CategoryCreate";
import Vue from "vue";
import Vuex from "vuex";
import "materialize-css/dist/js/materialize.min.js";
import Vuelidate from "vuelidate";
import messagePlugin from "@/utils/message.plugin";
Vue.use(Vuelidate);
Vue.use(messagePlugin);

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
    store.dispatch = jest.fn().mockImplementation(() => Promise.resolve());

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

  it("call right action with valid payload after submitting the form", async () => {
    await wrapper.find("#name-inp").setValue("Category name");
    await wrapper.find("#limit").setValue(500);
    await wrapper.find("form").trigger("submit.prevent");
    expect(store.dispatch).toHaveBeenCalledWith("category/createCategory", {
      title: "Category name",
      limit: 500,
    });
  });
});
