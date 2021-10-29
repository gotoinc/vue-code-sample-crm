import { shallowMount } from "@vue/test-utils";
import HomeBill from "@/components/HomeBill";
import Vue from "vue";
import localizeFilter from "@/filters/localize.filter";
import currencyFilter from "@/filters/currency.filter";
Vue.filter("localizeFilter", localizeFilter);
Vue.filter("currencyFilter", currencyFilter);

describe("HomeBill", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(HomeBill, {
      propsData: {
        rates: {},
      },
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
