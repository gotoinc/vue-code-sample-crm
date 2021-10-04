import { shallowMount } from '@vue/test-utils'
import Sidebar from '@/components/Common/Sidebar'

describe('Sidebar', () => {
    let wrapper;
    beforeEach(function () {
        wrapper = shallowMount(Sidebar);
    });

    it('check that component was rendered', () => {
        expect(wrapper.exists()).toBe(true);
    })
})