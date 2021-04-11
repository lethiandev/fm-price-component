import { computed, defineComponent, PropType, ref, watch } from 'vue'
import PriceSelectorPageviews from './PriceSelectorPageviews'
import PriceSelectorRate from './PriceSelectorRate'
import VSlider from './VSlider'
import VSwitch from './VSwitch'
import styles from '@/scss/price-selector.module.scss'

export interface Price {
  id: number
  pageViews: number
  price: number
}

export default defineComponent({
  name: 'PriceSelector',
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
    const discount = ref(false)

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

    return () => (
      <div class={styles.priceSelector}>
        <PriceSelectorPageviews pageViews={selected.value.pageViews} />
        <PriceSelectorRate
          price={selected.value.price}
          discount={discount.value ? 0.25 : 0.0}
        />
        <div class={styles.priceSelectorSlider}>
          <VSlider maxValue={props.prices.length} v-model={slider.value} />
        </div>
        <div class={styles.priceSelectorBilling}>
          Monthly Billing <VSwitch v-model={discount.value} /> Yearly Billing
          <span>25% discount</span>
        </div>
      </div>
    )
  },
})
