import { shallowMount, createLocalVue } from "@vue/test-utils";
import Login from "@/views/Login";
import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "@/router";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Login", () => {
  const router = new VueRouter({ routes });
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Login, {
      localVue,
      router,
      stubs: ["router-link", "flag"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
