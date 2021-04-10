import { shallowMount } from '@vue/test-utils'
import VSlider from '@/components/VSlider'

describe('VSlider.tsx', () => {
  it('should clamp input model values', async () => {
    const wrapper = shallowMount(VSlider, {
      props: { modelValue: 10, minValue: 20, maxValue: 100 },
    })

    await wrapper.setProps({ modelValue: 50 })
    await wrapper.setProps({ modelValue: 120 })
    await wrapper.setProps({ modelValue: -100 })

    const seq = [[20], [50], [100], [20]]
    expect(wrapper.emitted('update:modelValue')).toEqual(seq)
  })

  it('should emit update only on value change', async () => {
    const wrapper = shallowMount(VSlider, {
      props: { modelValue: 40, minValue: 20, maxValue: 100 },
    })

    await wrapper.setProps({ modelValue: 40 })
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    await wrapper.setProps({ modelValue: 80 })
    await wrapper.setProps({ modelValue: 80 })
    await wrapper.setProps({ modelValue: 20 })
    await wrapper.setProps({ modelValue: 20 })
    await wrapper.setProps({ modelValue: 80 })

    const seq = [[80], [20], [80]]
    expect(wrapper.emitted('update:modelValue')).toEqual(seq)
  })

  it('should emit update on min and max value changes', async () => {
    const wrapper = shallowMount(VSlider, {
      props: { modelValue: 10, minValue: 0, maxValue: 100 },
    })

    await wrapper.setProps({ minValue: 10 })
    await wrapper.setProps({ minValue: 20 })
    await wrapper.setProps({ minValue: 50 })
    await wrapper.setProps({ modelValue: 100 })
    await wrapper.setProps({ maxValue: 80 })

    const seq = [[20], [50], [100], [80]]
    expect(wrapper.emitted('update:modelValue')).toEqual(seq)
  })
})
