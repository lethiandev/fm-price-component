import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import PriceSelectorSlider from '@/components/PriceSelectorSlider'
import VSlider from '@/components/VSlider'

function factorPriceSelectorSlider(props: { maxIndex: number }) {
  return shallowMount(PriceSelectorSlider, { props })
}

describe('VPriceSelector.tsx', () => {
  it('should clamp selection index', async () => {
    const wrapper = factorPriceSelectorSlider({ maxIndex: 3 })

    await wrapper.setProps({ modelValue: 1 })
    await wrapper.setProps({ modelValue: -1 })
    await wrapper.setProps({ modelValue: 5 })

    const seq = [[1], [0], [2]]
    expect(wrapper.emitted('update:modelValue')).toEqual(seq)
  })

  it('should update index on slider dragging', async () => {
    const wrapper = factorPriceSelectorSlider({ maxIndex: 3 })
    const slider = wrapper.findComponent(VSlider)

    expect(slider.exists()).toBeTruthy()

    slider.vm.$emit('update:modelValue', 1)
    await nextTick()
    slider.vm.$emit('update:modelValue', 0.2)
    await nextTick()
    slider.vm.$emit('update:modelValue', 2.5)
    await nextTick()

    const seq = [[1], [0], [2]]
    expect(wrapper.emitted('update:modelValue')).toEqual(seq)
  })
})
