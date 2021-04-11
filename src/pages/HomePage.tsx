import { defineComponent, ref } from 'vue'
import VBanner from '@/components/VBanner'
import VCard from '@/components/VCard'
import PriceSelector, { Price } from '@/components/PriceSelector'
import styles from '@/scss/layout.module.scss'

export default defineComponent({
  name: 'HomePage',
  setup() {
    const prices: Price[] = [
      { id: 1, pageViews: 1e4, price: 8 },
      { id: 2, pageViews: 5e4, price: 12 },
      { id: 3, pageViews: 1e5, price: 16 },
      { id: 4, pageViews: 5e5, price: 24 },
      { id: 5, pageViews: 1e6, price: 36 },
    ]

    const startIndex = prices.length / 2
    const index = ref(startIndex)

    return () => (
      <>
        <VBanner>
          <h1>Simple, traffic-based pricing</h1>
          <p>Sign-up for our 30-day trial. No credit card required.</p>
        </VBanner>
        <main class={styles.containerMain}>
          <VCard>
            <PriceSelector prices={prices} v-model={index.value} />
          </VCard>
        </main>
      </>
    )
  },
})
