import { defineComponent } from 'vue'
import styles from '@/scss/banner.module.scss'

export default defineComponent({
  setup(props, { slots }) {
    return () => <header class={styles.banner}>{slots.default?.()}</header>
  },
})
