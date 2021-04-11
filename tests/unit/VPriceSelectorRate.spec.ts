import VPriceSelectorRate from '@/components/VPriceSelectorRate'
import { shallowMount } from '@vue/test-utils'

describe('VPriceSelectorRate.tsx', () => {
  it('should render price in USD currency', async () => {
    const wrapper = shallowMount(VPriceSelectorRate, {
      props: { price: 0 },
    })

    await wrapper.setProps({ price: 100 })
    expect(wrapper.text()).toEqual('$100.00 / month')

    await wrapper.setProps({ price: 250.5 })
    expect(wrapper.text()).toEqual('$250.50 / month')

    await wrapper.setProps({ price: 999.99 })
    expect(wrapper.text()).toEqual('$999.99 / month')

    await wrapper.setProps({ price: 155.01 })
    expect(wrapper.text()).toEqual('$155.01 / month')

    await wrapper.setProps({ price: 200.001 })
    expect(wrapper.text()).toEqual('$200.00 / month')
  })

  it('should render price with discount', async () => {
    const wrapper = shallowMount(VPriceSelectorRate, {
      props: { price: 0 },
    })

    await wrapper.setProps({ price: 100, discount: 0 })
    expect(wrapper.text()).toEqual('$100.00 / month')

    await wrapper.setProps({ price: 100, discount: 0.25 })
    expect(wrapper.text()).toEqual('$75.00 / month')

    await wrapper.setProps({ price: 200, discount: 0.75 })
    expect(wrapper.text()).toEqual('$50.00 / month')

    await wrapper.setProps({ price: 150, discount: 0.333 })
    expect(wrapper.text()).toEqual('$100.05 / month')

    await wrapper.setProps({ price: 1500.5, discount: 0.5 })
    expect(wrapper.text()).toEqual('$750.25 / month')
  })
})
