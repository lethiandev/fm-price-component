import { computed, defineComponent, PropType, ref, watch } from 'vue'
import formatNumber from '@/utils/formatNumber'
import formatCurrency from '@/utils/formatCurrency'
import VSlider from './VSlider'
import styles from '@/scss/price-selector.module.scss'

export interface Price {
  id: number
  pageViews: number
  price: number
}

export default defineComponent({
  name: 'VPriceSelector',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    prices: {
      type: Array as PropType<Price[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const index = ref(props.modelValue)
    const slider = ref(props.modelValue + 0.5)

    const selected = computed(() => props.prices[index.value])

    const clampIndex = (value: number) => {
      const len = props.prices.length
      const rounded = Math.floor(value)
      return Math.max(0, Math.min(len - 1, rounded))
    }

    const updateSlider = () => {
      const sliderIndex = clampIndex(slider.value)

      // Avoid slider flickering
      if (sliderIndex !== index.value) {
        slider.value = index.value + 0.5
      }
    }

    const select = (newIndex: number) => {
      const nextIndex = clampIndex(newIndex)

      if (index.value !== nextIndex) {
        index.value = nextIndex
        emit('update:modelValue', nextIndex)
      }

      updateSlider()
    }

    // Updates index based on slider position
    watch(slider, sliderIndex => select(sliderIndex))

    // Updates slider and clamps model value to valid index
    watch(props, ({ modelValue }) => select(modelValue), { immediate: true })

    return {
      slider,
      selected,
    }
  },
  render() {
    const prices = this.$props.prices

    return (
      <div class={styles.priceSelector}>
        <div class={styles.priceSelectorPageviews}>
          {formatNumber(this.selected.pageViews, 2)} Pageviews
        </div>
        <div class={styles.priceSelectorRate}>
          <span>{formatCurrency(this.selected.price)}</span> / month
        </div>
        <div class={styles.priceSelectorSlider}>
          <VSlider maxValue={prices.length} v-model={this.slider} />
        </div>
      </div>
    )
  },
})
