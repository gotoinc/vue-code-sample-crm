import { createLocalVue, mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import App from "@/App";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import "materialize-css/dist/js/materialize.min.js";

const localVue = createLocalVue();

localVue.use(VueRouter);

const router = new VueRouter();

describe("App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(App, {
      localVue,
      router,
      stubs: ["AuthLayout", "MainLayout"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
