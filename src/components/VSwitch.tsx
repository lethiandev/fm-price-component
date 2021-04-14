import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
import styles from '@/scss/switch.module.scss'

export default defineComponent({
  name: 'VSwitch',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const checked = ref(props.modelValue)

    const classes = computed(() =>
      checked.value ? [styles.switch, styles.switchChecked] : [styles.switch]
    )

    const toggle = () => (checked.value = !checked.value)

    // Update mode value on checkbox toggle
    watch(checked, value => emit('update:modelValue', value))

    // Keep sync with model value property
    watch(props, ({ modelValue }) => (checked.value = modelValue))

    return () => (
      <button
        type="button"
        role="checkbox"
        class={classes.value}
        aria-label="Discount toggle button"
        aria-checked={checked.value}
        onClick={toggle}
      >
        <input type="checkbox" checked={checked.value} hidden />
      </button>
    )
  },
})
