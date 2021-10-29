import { shallowMount } from "@vue/test-utils";
import CategoryCreate from "@/components/CategoryCreate";
import Vue from "vue";
import localizeFilter from "@/filters/localize.filter";
Vue.filter("localizeFilter", localizeFilter);
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

describe("CategoryCreate", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CategoryCreate, {
      propsData: {
        title: "Test title",
        limit: 100,
      },
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
