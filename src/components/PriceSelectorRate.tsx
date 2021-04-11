import { computed, defineComponent } from 'vue'
import formatCurrency from '@/utils/formatCurrency'
import styles from '@/scss/price-selector.module.scss'

export default defineComponent({
  name: 'VPriceSelectorRate',
  props: {
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0.0,
    },
  },
  setup(props) {
    const discount = computed(() => 1.0 - props.discount)
    const total = computed(() => props.price * discount.value)

    return () => (
      <div class={styles.priceSelectorRate}>
        <span>{formatCurrency(total.value)}</span> / month
      </div>
    )
  },
})
