import { shallowMount } from '@vue/test-utils'
import VShiftBy from '@/components/VShiftBy'

const translate = (x: number, y: number) =>
  `transform: translate(${x}px, ${y}px);`

describe('VShiftBy.tsx', () => {
  it('should apply identity transform by default', () => {
    const wrapper = shallowMount(VShiftBy)
    expect(wrapper.props('x')).toEqual(0)
    expect(wrapper.props('y')).toEqual(0)
    expect(wrapper.attributes('style')).toEqual(translate(0, 0))
  })

  it('should apply given transform', async () => {
    const wrapper = shallowMount(VShiftBy)

    await wrapper.setProps({ x: 100, y: 20 })
    expect(wrapper.attributes('style')).toEqual(translate(100, 20))

    await wrapper.setProps({ x: -50, y: -80 })
    expect(wrapper.attributes('style')).toEqual(translate(-50, -80))

    await wrapper.setProps({ x: 999, y: -999 })
    expect(wrapper.attributes('style')).toEqual(translate(999, -999))
  })
})
