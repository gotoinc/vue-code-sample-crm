import { shallowMount } from "@vue/test-utils";
import HistoryTable from "@/components/HistoryTable";
import Vue from "vue";
import localizeFilter from "@/filters/localize.filter";
import currencyFilter from "@/filters/currency.filter";
Vue.filter("localizeFilter", localizeFilter);
Vue.filter("currencyFilter", currencyFilter);

describe("HistoryTable", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(HistoryTable, {
      propsData: {
        records: [],
        passedItems: 1,
      },
      stubs: ["router-link"],
    });
  });

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
