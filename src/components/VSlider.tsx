import { computed, defineComponent, ref, watch } from 'vue'
import bindWindowEvents from '@/utils/bindWindowEvents'
import getOffsetFromPointerEvent from '@/utils/getOffsetFromPointerEvent'
import VSliderThumb from './VSliderThumb'
import styles from '@/scss/slider.module.scss'

export default defineComponent({
  name: 'VSlider',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      required: false,
      default: 0.0,
    },
    minValue: {
      type: Number,
      required: false,
      default: 0.0,
    },
    maxValue: {
      type: Number,
      required: false,
      default: 1.0,
    },
  },
  setup(props, { emit }) {
    const root = ref<HTMLElement>()
    const dragging = ref(false)
    const model = ref(props.modelValue)

    const valuePercentage = computed(() => {
      const factor = (model.value - props.minValue) / props.maxValue
      return `${factor * 100}%`
    })

    const valueStyle = computed(() => ({
      width: valuePercentage.value,
    }))

    const thumbStyle = computed(() => ({
      left: valuePercentage.value,
    }))

    const update = (value: number) => {
      const clamped = Math.max(props.minValue, Math.min(props.maxValue, value))

      // Emit update only on value change
      if (model.value !== clamped) {
        model.value = clamped
        emit('update:modelValue', model.value)
      }
    }

    const handleDrag = (ev: MouseEvent | TouchEvent) => {
      if (dragging.value && root.value) {
        const bounds = root.value.getBoundingClientRect()
        const offset = getOffsetFromPointerEvent(ev)

        const width = props.maxValue - props.minValue
        const factor = (offset.x - bounds.x) / bounds.width
        const clamped = Math.max(0.0, Math.min(1.0, factor))

        const value = width * clamped + props.minValue
        update(value)
      }
    }

    // Watch for prop changes to update internal value
    // Processes the update flow to clamp input model values
    watch(props, ({ modelValue }) => update(modelValue), { immediate: true })

    // Bind update event to the window
    // Allows thumb dragging outside the element
    bindWindowEvents(['mousemove', 'touchmove'], handleDrag)

    return {
      root,
      dragging,
      valueStyle,
      thumbStyle,
    }
  },
  render() {
    const customListeners = {
      onDrag: () => (this.dragging = true),
      onDrop: () => (this.dragging = false),
    }

    return (
      <div class={styles.slider} ref="root">
        <div class={styles.sliderValue} style={this.valueStyle}></div>
        <VSliderThumb {...customListeners} style={this.thumbStyle} />
      </div>
    )
  },
})
