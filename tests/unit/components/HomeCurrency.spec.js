import { shallowMount } from "@vue/test-utils";
import HomeCurrency from "@/components/HomeCurrency";
import Vue from "vue";
import localizeFilter from "@/filters/localize.filter";
import dateFilter from "@/filters/date.filter";
Vue.filter("localizeFilter", localizeFilter);
Vue.filter("dateFilter", dateFilter);

describe("HomeCurrency", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(HomeCurrency, {
      propsData: {
        rates: {},
        date: "",
      },
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
