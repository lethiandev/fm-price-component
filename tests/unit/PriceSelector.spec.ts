import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import PriceSelector, { Price } from '@/components/PriceSelector'
import VSlider from '@/components/VSlider'

const prices: Price[] = [
  { id: 1, pageViews: 1e4, price: 100 },
  { id: 1, pageViews: 1e5, price: 250.5 },
  { id: 1, pageViews: 25e6, price: 999.99 },
]

function factorVPriceSelector() {
  return shallowMount(PriceSelector, {
    props: { prices },
  })
}

describe('VPriceSelector.tsx', () => {
  it('should clamp selection index', async () => {
    const wrapper = factorVPriceSelector()

    await wrapper.setProps({ modelValue: 1 })
    await wrapper.setProps({ modelValue: -1 })
    await wrapper.setProps({ modelValue: 5 })

    const seq = [[1], [0], [2]]
    expect(wrapper.emitted('update:modelValue')).toEqual(seq)
  })

  it('should update selection on slider dragging', async () => {
    const wrapper = factorVPriceSelector()
    const slider = wrapper.findComponent(VSlider)

    expect(slider.exists()).toBeTruthy()

    slider.vm.$emit('update:modelValue', 1)
    await nextTick()
    slider.vm.$emit('update:modelValue', 0)
    await nextTick()
    slider.vm.$emit('update:modelValue', 2)
    await nextTick()

    const seq = [[1], [0], [2]]
    expect(wrapper.emitted('update:modelValue')).toEqual(seq)
  })
})
