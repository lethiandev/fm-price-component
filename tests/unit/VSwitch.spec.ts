import { shallowMount } from '@vue/test-utils'
import VSwitch from '@/components/VSwitch'

describe('VSwitch.tsx', () => {
  it('should be unchecked checkbox by default', () => {
    const wrapper = shallowMount(VSwitch)
    const input = wrapper.find('input')

    expect(input.exists()).toBeTruthy()
    expect(input.attributes('type')).toEqual('checkbox')
    expect(input.element.checked).toBeFalsy()
  })

  it('should be checked when value provided', () => {
    const wrapper = shallowMount(VSwitch, {
      props: { modelValue: true },
    })

    const input = wrapper.find('input')
    expect(input.element.checked).toBeTruthy()
  })

  it('should toggle on props change', async () => {
    const wrapper = shallowMount(VSwitch)

    const input = wrapper.find('input')

    expect(wrapper.attributes('aria-checked')).toEqual('false')
    expect(input.element.checked).toBeFalsy()

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.attributes('aria-checked')).toEqual('true')
    expect(input.element.checked).toBeTruthy()

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.attributes('aria-checked')).toEqual('false')
    expect(input.element.checked).toBeFalsy()

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.attributes('aria-checked')).toEqual('false')
    expect(input.element.checked).toBeFalsy()
  })

  it('should check checkbox on click', async () => {
    const wrapper = shallowMount(VSwitch)
    const input = wrapper.find('input')

    await wrapper.trigger('click')

    expect(wrapper.attributes('aria-checked')).toEqual('true')
    expect(input.element.checked).toBeTruthy()

    await wrapper.trigger('click')

    expect(wrapper.attributes('aria-checked')).toEqual('false')
    expect(input.element.checked).toBeFalsy()
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
