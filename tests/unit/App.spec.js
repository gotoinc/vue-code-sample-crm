import { createLocalVue, mount } from "@vue/test-utils";
import App from "@/App";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import "materialize-css/dist/js/materialize.min.js";
// import Vuex from "vuex";
//
// const localVue = createLocalVue();
//
// localVue.use(Vuex);

describe("App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(App, {
      // localVue,
      stubs: ["router-view", "AuthLayout", "MainLayout"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
