import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

import VSliderThumb from './VSliderThumb'
import styles from '@/scss/slider.module.scss'

function bindWindowEvents(callback: (ev: MouseEvent | TouchEvent) => void) {
  onMounted(function () {
    window.addEventListener('mousemove', callback, false)
    window.addEventListener('touchmove', callback, false)
  })

  onUnmounted(function () {
    window.removeEventListener('mousemove', callback, false)
    window.removeEventListener('touchmove', callback, false)
  })
}

function getOffsetFrom(ev: MouseEvent | TouchEvent): { x: number; y: number } {
  if (ev instanceof MouseEvent) {
    return { x: ev.pageX, y: ev.pageY }
  } else if (ev instanceof TouchEvent) {
    const touch = ev.touches[0]
    return { x: touch.pageX, y: touch.pageY }
  }

  return { x: 0, y: 0 }
}

export default defineComponent({
  name: 'VSlider',
  emits: ['input'],
  props: {
    value: {
      type: Number,
      required: false,
      default: 0.5,
    },
    minValue: {
      type: Number,
      required: false,
      default: 0.0,
    },
    maxValue: {
      type: Number,
      required: false,
      default: 100.0,
    },
  },
  setup(props, { emit }) {
    const root = ref<HTMLElement>()
    const dragging = ref(false)
    const model = ref(props.value)

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

    const update = (ev: MouseEvent | TouchEvent) => {
      if (dragging.value && root.value) {
        const bounds = root.value.getBoundingClientRect()
        const offset = getOffsetFrom(ev)

        const width = props.maxValue - props.minValue
        const factor = (offset.x - bounds.x) / bounds.width
        const clamped = Math.max(0.0, Math.min(1.0, factor))

        model.value = width * clamped + props.minValue
        emit('input', model.value)
      }
    }

    // Watch for prop changes to update internal value
    watch(
      () => props.value,
      value => (model.value = value)
    )

    // Bind update event to the window
    // Allows thumb dragging outside the element
    bindWindowEvents(update)

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
