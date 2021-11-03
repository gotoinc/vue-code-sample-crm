import { shallowMount, createLocalVue } from "@vue/test-utils";
import SignUp from "@/views/SignUp";
import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "@/router";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("SignUp", () => {
  const router = new VueRouter({ routes });
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SignUp, {
      localVue,
      router,
      stubs: ["router-link"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
