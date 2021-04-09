import { defineComponent } from 'vue'
import styles from '@/scss/card.module.scss'

export default defineComponent({
  setup(props, { slots }) {
    return () => <article class={styles.card}>{slots.default?.()}</article>
  },
})
