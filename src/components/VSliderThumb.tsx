import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  withModifiers,
} from 'vue'

import styles from '@/scss/slider.module.scss'

function bindWindowUpEvents(callback: () => void) {
  onMounted(() => {
    window.addEventListener('mouseup', callback, false)
    window.addEventListener('touchend', callback, false)
  })

  onUnmounted(() => {
    window.removeEventListener('mouseup', callback, false)
    window.removeEventListener('touchend', callback, false)
  })
}

export default defineComponent({
  name: 'VSliderThumb',
  emits: ['drag', 'drop'],
  setup(props, { emit }) {
    const dragging = ref(false)

    const drag = () => {
      if (!dragging.value) {
        dragging.value = true
        emit('drag')
      }
    }

    const drop = () => {
      if (dragging.value) {
        dragging.value = false
        emit('drop')
      }
    }

    // Bind drop event on window
    if (window) {
      bindWindowUpEvents(drop)
    }

    return {
      dragging,
      drag,
      drop,
    }
  },
  render() {
    // Dummy event to prevent default actions
    const dummyPrevent = withModifiers(() => void 0, ['prevent'])
    const classNames = [styles.sliderThumb]

    if (this.dragging) {
      classNames.push(styles.sliderThumbDragging)
    }

    return (
      <div
        class={classNames}
        onMousedown={this.drag}
        onMouseup={this.drop}
        onTouchstart={this.drag}
        onTouchend={this.drop}
        onDragstart={dummyPrevent}
      ></div>
    )
  },
})
