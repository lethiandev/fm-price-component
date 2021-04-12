import { computed, defineComponent, ref, TransitionGroup, watch } from 'vue'
import formatCurrency from '@/utils/formatCurrency'
import styles from '@/scss/price-selector.module.scss'

export default defineComponent({
  name: 'PriceSelectorRate',
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
    const trigger = ref(0)
    const discount = computed(() => 1.0 - props.discount)
    const total = computed(() => props.price * discount.value)

    // Discount change triggers transition animation
    watch(discount, () => trigger.value++)

    return () => (
      <div class={styles.priceSelectorRate}>
        <div class={styles.priceSelectorRateTransition}>
          <TransitionGroup name="roll-in-out">
            <span key={trigger.value}>{formatCurrency(total.value)}</span>
          </TransitionGroup>
        </div>
        / month
      </div>
    )
  },
})
