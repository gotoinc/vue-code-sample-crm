import { createLocalVue, shallowMount } from "@vue/test-utils";
import Record from "@/views/Record";
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

describe("Record", () => {
  let wrapper;
  let actionsCategory;
  let actionsRecord;
  let actionsInfo;
  let store;
  let spy;

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
      fetchCategories: jest.fn(() => Promise.resolve()),
    };
    actionsRecord = {
      createRecord: jest.fn(() => Promise.resolve()),
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
    // store.dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    spy = jest.spyOn(store, "dispatch");

    wrapper = shallowMount(Record, {
      store,
      localVue,
      stubs: ["Loader"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("check correctly inputted data", async () => {
    await wrapper.find("#amount").setValue(50);
    await wrapper.find("#description").setValue("Spent 50$ on something");
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeFalsy();
  });
  it("check error on empty description", async () => {
    await wrapper.find("#amount").setValue(50);
    await wrapper.find("#description").setValue("");
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeTruthy();
  });
  it("check error on incorrect amount value", async () => {
    await wrapper.find("#amount").setValue(0);
    await wrapper.find("#description").setValue("Spent 0$ on something");
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".helper-text.invalid").exists()).toBeTruthy();
  });

  it("call right action with valid payload after submitting the form", async () => {
    // await wrapper.find("select").setValue(1);
    // const radio = wrapper.find('input[type="radio"]');
    // radio.element.selected = true;
    // await radio.trigger("change");
    const date = new Date().toJSON();
    // await wrapper.setData({ date: date });
    await wrapper.find("#amount").setValue(200);
    await wrapper.find("#description").setValue("Some text");
    await wrapper.find("form").trigger("submit.prevent");
    await store.dispatch("record/createRecord", {
      categoryId: null,
      amount: 200,
      description: "Some text",
      type: "outcome",
      date: date,
    });
    expect(spy).toHaveBeenCalledWith("record/createRecord", {
      categoryId: null,
      amount: 200,
      description: "Some text",
      type: "outcome",
      date: date,
    });
    // await actionsRecord.createRecord();
    // expect(actionsRecord.createRecord).toHaveBeenCalled();
    // await store.dispatch("record/createRecord", {});
    // expect(store.dispatch).toHaveBeenCalledWith("record/createRecord", {});
  });
});
