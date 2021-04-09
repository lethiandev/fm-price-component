import { shallowMount } from '@vue/test-utils'
import VSlider from '@/components/VSlider'

describe('VSlider.tsx', () => {
  it('should render hidden input element', () => {
    const wrapper = shallowMount(VSlider)
    expect(wrapper.find('input').exists()).toBeTruthy()
  })
})
