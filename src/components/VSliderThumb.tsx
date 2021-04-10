import { defineComponent, ref, withModifiers } from 'vue'
import bindWindowEvents from '@/utils/bindWindowEvents'
import styles from '@/scss/slider.module.scss'

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
    // Allows dropping thumb outside the element
    bindWindowEvents(['mouseup', 'touchend'], drop)

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
