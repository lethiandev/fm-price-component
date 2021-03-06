import { defineComponent, ref } from 'vue'
import VBanner from '@/components/VBanner'
import { Price } from '@/components/PriceSelector'
import PriceFormCard from '@/components/PriceFormCard'
import styles from '@/scss/layout.module.scss'

export default defineComponent({
  name: 'HomePage',
  setup() {
    // Static price data
    // Can be fetched from the server
    const prices = ref<Price[]>([
      { id: 1, pageViews: 1e4, price: 8 },
      { id: 2, pageViews: 5e4, price: 12 },
      { id: 3, pageViews: 1e5, price: 16 },
      { id: 4, pageViews: 5e5, price: 24 },
      { id: 5, pageViews: 1e6, price: 36 },
    ])

    return () => (
      <>
        <VBanner>
          <h1>Simple, traffic-based pricing</h1>
          <p>
            <span>Sign-up for our 30-day trial.</span>{' '}
            <span>No credit card required.</span>
          </p>
        </VBanner>
        <main class={styles.containerMain}>
          <PriceFormCard prices={prices.value} />
        </main>
      </>
    )
  },
})
