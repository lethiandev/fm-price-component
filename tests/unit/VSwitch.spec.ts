import { shallowMount } from '@vue/test-utils'
import VSwitch from '@/components/VSwitch'

describe('VSwitch.tsx', () => {
  it('should be unchecked checkbox by default', () => {
    const wrapper = shallowMount(VSwitch)
    expect(wrapper.classes('switch--checked')).toBeFalsy()
  })

  it('should be checked when value provided', () => {
    const wrapper = shallowMount(VSwitch, {
      props: { modelValue: true },
    })

    expect(wrapper.classes('switchChecked')).toBeTruthy()
  })

  it('should toggle on props change', async () => {
    const wrapper = shallowMount(VSwitch)

    expect(wrapper.attributes('aria-checked')).toEqual('false')
    expect(wrapper.classes('switchChecked')).toBeFalsy()

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.attributes('aria-checked')).toEqual('true')
    expect(wrapper.classes('switchChecked')).toBeTruthy()

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.attributes('aria-checked')).toEqual('false')
    expect(wrapper.classes('switchChecked')).toBeFalsy()

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.attributes('aria-checked')).toEqual('false')
    expect(wrapper.classes('switchChecked')).toBeFalsy()
  })

  it('should check and uncheck checkbox on click', async () => {
    const wrapper = shallowMount(VSwitch)

    await wrapper.trigger('click')

    expect(wrapper.attributes('aria-checked')).toEqual('true')
    expect(wrapper.classes('switchChecked')).toBeTruthy()

    await wrapper.trigger('click')

    expect(wrapper.attributes('aria-checked')).toEqual('false')
    expect(wrapper.classes('switchChecked')).toBeFalsy()
  })

  it('should emit value update on click', async () => {
    const wrapper = shallowMount(VSwitch)

    await wrapper.trigger('click')
    await wrapper.trigger('click')
    await wrapper.trigger('click')

    const seq = [[true], [false], [true]]
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toEqual(seq)
  })
})
