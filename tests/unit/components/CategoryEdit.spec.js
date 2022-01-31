import { createLocalVue, shallowMount } from "@vue/test-utils";
import CategoryEdit from "@/components/CategoryEdit";
import Vue from "vue";
import { nextTick } from "vue";
import Vuex from "vuex";
import "materialize-css/dist/js/materialize.min.js";
import Vuelidate from "vuelidate";
import messagePlugin from "@/utils/message.plugin";
Vue.use(Vuelidate);
Vue.use(messagePlugin);

const localVue = createLocalVue();

localVue.use(Vuex);

describe("CategoryEdit", () => {
  let wrapper;
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      updateCategory: jest.fn(),
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

    wrapper = shallowMount(CategoryEdit, {
      store,
      localVue,
      propsData: {
        categories: [
          {
            id: 1,
            title: "Dinners",
            limit: 150,
          },
          {
            id: 2,
            title: "Cloth",
            limit: 200,
          },
        ],
      },
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("check correctly inputted data", async () => {
    await wrapper.find("#name-inp").setValue("Category name");
    await wrapper.find("#limit").setValue(500);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeFalsy();
  });
  it("check error on empty name", async () => {
    await wrapper.find("#name-inp").setValue("");
    await wrapper.find("#limit").setValue(500);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeTruthy();
  });
  it("check error on incorrect limit value", async () => {
    await wrapper.find("#name-inp").setValue("Category name");
    await wrapper.find("#limit").setValue(50);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeTruthy();
  });

  it("call right action with valid payload after submitting the form", async () => {
    await wrapper.find("select").setValue(1);
    await wrapper.find("#name-inp").setValue("Dinners & coffee");
    await wrapper.find("#limit").setValue(200);
    await wrapper.find("form").trigger("submit.prevent");
    expect(store.dispatch).toHaveBeenCalledWith("category/updateCategory", {
      id: 1,
      title: "Dinners & coffee",
      limit: 200,
    });
  });
});
