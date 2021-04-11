import { defineComponent } from 'vue'
import formatNumber from '@/utils/formatNumber'
import styles from '@/scss/price-selector.module.scss'

export default defineComponent({
  name: 'VPriceSelectorPageviews',
  props: {
    pageViews: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class={styles.priceSelectorPageviews}>
        {formatNumber(props.pageViews, 2)} Pageviews
      </div>
    )
  },
})
