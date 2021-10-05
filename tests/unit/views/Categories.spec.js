import { shallowMount } from '@vue/test-utils'
import Categories from '@/views/Categories'
import localizeFilter from "@/filters/localize.filter";

describe('Categories', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Categories);
    });

    it('check that component was rendered', () => {
        expect(wrapper.exists()).toBe(true);
    })
})