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
  it("check that component was rendered", () => {
    const wrapper = mount(App, {
      localVue,
      router,
      stubs: ["AuthLayout", "MainLayout"],
    });
    expect(wrapper.exists()).toBe(true);
  });
  it("check that MainLayout was rendered correctly", () => {
    const wrapper = mount(App, {
      localVue,
      router,
      stubs: ["AuthLayout", "MainLayout"],
      computed: {
        layout() {
          return "main-layout";
        },
      },
    });
    expect(wrapper.contains(MainLayout)).toBe(true);
  });
  it("check that MainLayout was rendered correctly", () => {
    const wrapper = mount(App, {
      localVue,
      router,
      stubs: ["AuthLayout", "MainLayout"],
      computed: {
        layout() {
          return "auth-layout";
        },
      },
    });
    expect(wrapper.contains(AuthLayout)).toBe(true);
  });
});
