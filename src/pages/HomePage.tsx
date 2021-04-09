import { defineComponent } from 'vue'
import VCard from '@/components/VCard'
import styles from '@/scss/layout.module.scss'
import VBanner from '@/components/VBanner'

export default defineComponent({
  name: 'HomePage',
  setup() {
    return () => (
      <>
        <VBanner>
          <h1>Simple, traffic-based pricing</h1>
          <p>Sign-up for our 30-day trial. No credit card required.</p>
        </VBanner>
        <main class={styles.containerMain}>
          <VCard>Hello, world!</VCard>
        </main>
      </>
    )
  },
})
