import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Login";
import Vue from "vue";
import localizeFilter from "@/filters/localize.filter";
Vue.filter("localizeFilter", localizeFilter);
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

describe("Login", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Login, {
      stubs: ["router-link"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
