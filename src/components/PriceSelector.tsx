import { computed, defineComponent, PropType, ref, watch } from 'vue'
import PriceSelectorPageviews from './PriceSelectorPageviews'
import PriceSelectorRate from './PriceSelectorRate'
import PriceSelectorSlider from './PriceSelectorSlider'
import VSwitch from './VSwitch'

import priceStyles from '@/scss/price-selector.module.scss'
import tagStyles from '@/scss/tag.module.scss'

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
    const discount = ref(false)

    const selected = computed(() => props.prices[index.value])
    const maxIndex = computed(() => props.prices.length)

    const discountRate = computed(() => (discount.value ? 0.25 : 0.0))
    const pageViews = computed(() => selected.value.pageViews)
    const price = computed(() => selected.value.price)

    // Emits index of selected price on slider dragging
    watch(index, value => emit('update:modelValue', value))

    // Updates selection when properties changed
    watch(props, ({ modelValue }) => (index.value = modelValue))

    return () => (
      <div class={priceStyles.priceSelector}>
        <PriceSelectorPageviews pageViews={pageViews.value} />
        <PriceSelectorRate price={price.value} discount={discountRate.value} />
        <PriceSelectorSlider maxIndex={maxIndex.value} v-model={index.value} />
        <div class={priceStyles.priceSelectorBilling}>
          Monthly Billing <VSwitch v-model={discount.value} /> Yearly Billing
          <span class={tagStyles.tagDiscount}>
            -25% <span class={tagStyles.tagExtra}>discount</span>
          </span>
        </div>
      </div>
    )
  },
})
