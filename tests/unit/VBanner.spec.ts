import { mount } from '@vue/test-utils'
import VBanner from '@/components/VBanner'

describe('VBanner.tsx', () => {
  it('should render as header', () => {
    const wrapper = mount(VBanner)
    expect(wrapper.element.tagName).toEqual('HEADER')
  })

  it('should render given content', () => {
    const defaultSlot = 'Test banner content'
    const wrapper = mount(VBanner, {
      slots: { default: defaultSlot },
    })

    expect(wrapper.text()).toEqual(defaultSlot)
  })
})
