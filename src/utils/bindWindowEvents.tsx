import { onMounted, onUnmounted } from 'vue'

export default function bindWindowEvents<K extends keyof WindowEventMap>(
  types: K[],
  callback: (ev: WindowEventMap[K]) => any
) {
  onMounted(function () {
    for (const type of types) {
      window.addEventListener(type, callback, false)
    }
  })

  onUnmounted(function () {
    for (const type of types) {
      window.removeEventListener(type, callback, false)
    }
  })
}
