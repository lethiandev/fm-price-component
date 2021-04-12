import { shallowMount } from '@vue/test-utils'
import PriceSelectorRate from '@/components/PriceSelectorRate'

describe('PriceSelectorRate.tsx', () => {
  it('should render price in USD currency', async () => {
    const wrapper = shallowMount(PriceSelectorRate, {
      props: { price: 0 },
    })

    await wrapper.setProps({ price: 100 })
    expect(wrapper.find('span').text()).toEqual('$100.00')

    await wrapper.setProps({ price: 250.5 })
    expect(wrapper.find('span').text()).toEqual('$250.50')

    await wrapper.setProps({ price: 999.99 })
    expect(wrapper.find('span').text()).toEqual('$999.99')

    await wrapper.setProps({ price: 155.01 })
    expect(wrapper.find('span').text()).toEqual('$155.01')

    await wrapper.setProps({ price: 200.001 })
    expect(wrapper.find('span').text()).toEqual('$200.00')
  })

  it('should render price with discount', async () => {
    const wrapper = shallowMount(PriceSelectorRate, {
      props: { price: 0 },
    })

    await wrapper.setProps({ price: 100, discount: 0 })
    expect(wrapper.find('span').text()).toEqual('$100.00')

    await wrapper.setProps({ price: 100, discount: 0.25 })
    expect(wrapper.find('span').text()).toEqual('$75.00')

    await wrapper.setProps({ price: 200, discount: 0.75 })
    expect(wrapper.find('span').text()).toEqual('$50.00')

    await wrapper.setProps({ price: 150, discount: 0.333 })
    expect(wrapper.find('span').text()).toEqual('$100.05')

    await wrapper.setProps({ price: 1500.5, discount: 0.5 })
    expect(wrapper.find('span').text()).toEqual('$750.25')
  })
})
