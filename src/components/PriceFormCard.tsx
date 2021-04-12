import { defineComponent, PropType, ref } from 'vue'
import VCard from './VCard'
import PriceSelector, { Price } from '@/components/PriceSelector'

import cardStyles from '@/scss/card.module.scss'
import buttonStyles from '@/scss/button.module.scss'

export default defineComponent({
  name: 'PriceFormCard',
  props: {
    prices: {
      type: Array as PropType<Price[]>,
      required: true,
    },
  },
  setup(props) {
    const initialIndex = Math.floor(props.prices.length / 2)
    const index = ref(initialIndex)

    return () => (
      <VCard>
        <form id="price-form" action="/" method="post">
          <PriceSelector prices={props.prices} v-model={index.value} />
        </form>
        <footer class={cardStyles.cardFooter}>
          <ul>
            <li>Unlimited websites</li>
            <li>100% data ownership</li>
            <li>Email reports</li>
          </ul>
          <button type="submit" form="price-form" class={buttonStyles.button}>
            Start my trial
          </button>
        </footer>
      </VCard>
    )
  },
})
