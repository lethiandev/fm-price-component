import VCard from '@/components/VCard'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <main>
        <VCard>Hello, world!</VCard>
      </main>
    )
  },
})
