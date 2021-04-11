import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import PriceSelector, { Price } from '@/components/PriceSelector'
import PriceSelectorSlider from '@/components/PriceSelectorSlider'

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
  it('should emit changes on slider dragging', async () => {
    const wrapper = factorVPriceSelector()
    const slider = wrapper.findComponent(PriceSelectorSlider)

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
