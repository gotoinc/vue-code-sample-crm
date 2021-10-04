import {shallowMount} from '@vue/test-utils'
import CategoryCreate from '@/components/CategoryCreate'

describe('CategoryCreate', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(CategoryCreate, {
            propsData: {
                title: 'Test title',
                limit: 100
            }
        });
    });

    it('check that component was rendered', () => {
        expect(wrapper.exists()).toBe(true);
    })
})