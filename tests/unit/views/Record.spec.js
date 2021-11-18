import { createLocalVue, shallowMount } from "@vue/test-utils";
import Record from "@/views/Record";
import Vue from "vue";
import Vuex from "vuex";
import "materialize-css/dist/js/materialize.min.js";
import Vuelidate from "vuelidate";
import messagePlugin from "@/utils/message.plugin";
Vue.use(Vuelidate);
Vue.use(messagePlugin);

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Record", () => {
  let wrapper;
  let actionsCategory;
  let actionsRecord;
  let actionsInfo;
  let store;

  beforeEach(() => {
    actionsInfo = {
      updateInfo: jest.fn(() => [
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
      ]),
    };
    actionsCategory = {
      fetchCategories: jest.fn(),
    };
    actionsRecord = {
      createRecord: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        info: {
          namespaced: true,
          state: {
            bill: 700,
            locale: "en",
            name: "Alla",
          },
          actions: actionsInfo,
        },
        category: {
          namespaced: true,
          actions: actionsCategory,
        },
        record: {
          namespaced: true,
          actions: actionsRecord,
        },
      },
    });
    store.dispatch = jest.fn().mockImplementation(() => Promise.resolve());

    wrapper = shallowMount(Record, {
      store,
      localVue,
      stubs: ["Loader"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("check input data", async () => {
    await wrapper.find("#amount").setValue(50);
    await wrapper.find("#description").setValue("Spent 50$ on something");
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeFalsy();

    await wrapper.find("#amount").setValue(50);
    await wrapper.find("#description").setValue("");
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeTruthy();

    await wrapper.find("#amount").setValue(0);
    await wrapper.find("#description").setValue("Spent 0$ on something");
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeTruthy();
  });

  // it("call right action with valid payload after submitting the form", async () => {
  //   await wrapper.find("select").setValue(1);
  //   await wrapper.find("#name-inp").setValue("Dinners & coffee");
  //   await wrapper.find("#limit").setValue(200);
  //   await wrapper.find("form").trigger("submit.prevent");
  //   expect(store.dispatch).toHaveBeenCalledWith("category/updateCategory", {
  //     id: 1,
  //     title: "Dinners & coffee",
  //     limit: 200,
  //   });
  // });
});
