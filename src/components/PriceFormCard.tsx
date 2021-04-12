import { defineComponent, PropType, ref, withModifiers } from 'vue'
import VCard from './VCard'
import VShiftBy from './VShiftBy'
import PriceSelector, { Price } from '@/components/PriceSelector'

import cardStyles from '@/scss/card.module.scss'
import buttonStyles from '@/scss/button.module.scss'

export default defineComponent({
  name: 'PriceFormCard',
  emits: ['submit'],
  props: {
    prices: {
      type: Array as PropType<Price[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const initialIndex = Math.floor(props.prices.length / 2)
    const index = ref(initialIndex)

    const submit = withModifiers(
      (ev: Event) => {
        if (ev.target instanceof HTMLFormElement) {
          emit('submit', new FormData(ev.target))
        }
      },
      ['prevent']
    )

    return () => (
      <VCard>
        <form id="price-form" action="/" method="post" onSubmit={submit}>
          <PriceSelector prices={props.prices} v-model={index.value} />
        </form>
        <footer class={cardStyles.cardFooter}>
          <ul>
            <li>Unlimited websites</li>
            <li>100% data ownership</li>
            <li>Email reports</li>
          </ul>
          <VShiftBy x={2}>
            <button type="submit" form="price-form" class={buttonStyles.button}>
              Start my trial
            </button>
          </VShiftBy>
        </footer>
      </VCard>
    )
  },
})
