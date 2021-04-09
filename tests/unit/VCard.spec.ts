import VCard from '@/components/VCard'
import { mount } from '@vue/test-utils'

describe('VCard.tsx', () => {
  it('should render as article', () => {
    const wrapper = mount(VCard)
    expect(wrapper.element.tagName).toEqual('ARTICLE')
  })

  it('should render given content', () => {
    const defaultSlot = 'Hello from test!'
    const wrapper = mount(VCard, {
      slots: { default: defaultSlot },
    })

    expect(wrapper.text()).toEqual(defaultSlot)
  })
})
