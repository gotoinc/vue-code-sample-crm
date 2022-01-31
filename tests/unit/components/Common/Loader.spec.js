import { mount } from "@vue/test-utils";
import Loader from "@/components/Common/Loader";

describe("Loader", () => {
  let wrapper;
  wrapper = mount(Loader);

  it("check that component was rendered", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
