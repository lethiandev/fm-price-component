import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import VPriceSelector, { Price } from '@/components/VPriceSelector'
import VSlider from '@/components/VSlider'

const prices: Price[] = [
  { id: 1, pageViews: 1e4, price: 100 },
  { id: 1, pageViews: 1e5, price: 250.5 },
  { id: 1, pageViews: 25e6, price: 999.99 },
]

function factorVPriceSelector() {
  return shallowMount(VPriceSelector, {
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

  it('should render pageviews in short format', async () => {
    const wrapper = factorVPriceSelector()
    const pageviews = wrapper.find('.priceSelectorPageviews')

    expect(pageviews.exists()).toBeTruthy()

    await wrapper.setProps({ modelValue: 0 })
    expect(pageviews.text()).toEqual('10K Pageviews')

    await wrapper.setProps({ modelValue: 1 })
    expect(pageviews.text()).toEqual('100K Pageviews')

    await wrapper.setProps({ modelValue: 2 })
    expect(pageviews.text()).toEqual('25M Pageviews')
  })

  it('should render price in USD currency', async () => {
    const wrapper = factorVPriceSelector()
    const rate = wrapper.find('.priceSelectorRate')

    expect(rate.exists()).toBeTruthy()

    await wrapper.setProps({ modelValue: 0 })
    expect(rate.text()).toEqual('$100.00 / month')

    await wrapper.setProps({ modelValue: 1 })
    expect(rate.text()).toEqual('$250.50 / month')

    await wrapper.setProps({ modelValue: 2 })
    expect(rate.text()).toEqual('$999.99 / month')
  })
})
