import { computed, defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'VShiftBy',
  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    const styling = computed(() => ({
      transform: `translate(${props.x}px, ${props.y}px)`,
    }))

    return () => <div style={styling.value}>{slots.default?.()}</div>
  },
})
