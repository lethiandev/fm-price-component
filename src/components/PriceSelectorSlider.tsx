import { defineComponent, ref, watch } from 'vue'
import VSlider from './VSlider'
import styles from '@/scss/price-selector.module.scss'

export default defineComponent({
  name: 'PriceSelectorSlider',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    maxIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const index = ref(props.modelValue)
    const slider = ref(props.modelValue + 0.5)

    const clampIndex = (value: number) => {
      const roundedIndex = Math.floor(value)
      return Math.max(0, Math.min(props.maxIndex - 1, roundedIndex))
    }

    const updateSlider = () => {
      const sliderIndex = clampIndex(slider.value)

      // Avoid slider flickering
      if (sliderIndex !== index.value) {
        slider.value = index.value + 0.5
      }
    }

    const select = async (newIndex: number) => {
      const nextIndex = clampIndex(newIndex)

      if (index.value !== nextIndex) {
        index.value = nextIndex
        emit('update:modelValue', nextIndex)
        updateSlider()
      }
    }

    // Updates index based on slider position
    watch(slider, value => select(value))

    // Updates slider based on properties change
    watch(props, ({ modelValue }) => select(modelValue), { immediate: true })

    return () => (
      <div class={styles.priceSelectorSlider}>
        <VSlider maxValue={props.maxIndex} v-model={slider.value} />
      </div>
    )
  },
})
