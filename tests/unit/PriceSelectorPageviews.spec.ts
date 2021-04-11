import { shallowMount } from '@vue/test-utils'
import PriceSelectorPageviews from '@/components/PriceSelectorPageviews'

describe('PriceSelectorPageviews.tsx', () => {
  it('should render pageviews in short format', async () => {
    const wrapper = shallowMount(PriceSelectorPageviews, {
      props: { pageViews: 0 },
    })

    await wrapper.setProps({ pageViews: 10e3 })
    expect(wrapper.text()).toEqual('10K Pageviews')

    await wrapper.setProps({ pageViews: 10e4 })
    expect(wrapper.text()).toEqual('100K Pageviews')

    await wrapper.setProps({ pageViews: 25e6 })
    expect(wrapper.text()).toEqual('25M Pageviews')
  })
})
