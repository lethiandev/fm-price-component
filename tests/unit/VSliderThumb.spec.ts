import { mount } from '@vue/test-utils'
import VSliderThumb from '@/components/VSliderThumb'

describe('VSliderThumb.tsx', () => {
  it('should emit drag and drop event on mouse events', async () => {
    const wrapper = mount(VSliderThumb)

    await wrapper.trigger('mousedown')
    expect(wrapper.emitted().drag).toBeTruthy()

    await wrapper.trigger('mouseup')
    expect(wrapper.emitted().drop).toBeTruthy()
  })

  it('should emit drag and drop event on touch events', async () => {
    const wrapper = mount(VSliderThumb)

    await wrapper.trigger('touchstart')
    expect(wrapper.emitted().drag).toBeTruthy()

    await wrapper.trigger('touchend')
    expect(wrapper.emitted().drop).toBeTruthy()
  })

  it('should not overlap drag and drop events', async () => {
    const wrapper = mount(VSliderThumb)

    await wrapper.trigger('mousedown')
    await wrapper.trigger('mousedown')
    await wrapper.trigger('mouseup')
    await wrapper.trigger('mousedown')
    await wrapper.trigger('mousedown')
    await wrapper.trigger('mouseup')
    await wrapper.trigger('mouseup')

    const emitted = wrapper.emitted()
    expect(emitted.drag.length).toBe(2)
    expect(emitted.drop.length).toBe(2)
  })
})
