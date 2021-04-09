import { defineComponent } from 'vue'
import VCard from '@/components/VCard'
import styles from '@/scss/layout.module.scss'

export default defineComponent({
  setup() {
    return () => (
      <main class={styles.containerMain}>
        <VCard>Hello, world!</VCard>
      </main>
    )
  },
})
