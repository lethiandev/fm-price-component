export type PointerEvent = MouseEvent | TouchEvent
export type Offset = { x: number; y: number }

function getOffsetFromMouseEvent(ev: MouseEvent): Offset {
  return { x: ev.pageX, y: ev.pageY }
}

function getOffsetFromTouchEvent(ev: TouchEvent): Offset {
  const touch = ev.touches[0]
  return { x: touch.pageX, y: touch.pageY }
}

export default function getOffsetFromPointerEvent(ev: PointerEvent): Offset {
  if (ev instanceof MouseEvent) {
    return getOffsetFromMouseEvent(ev)
  } else if (ev instanceof TouchEvent) {
    return getOffsetFromTouchEvent(ev)
  }

  return { x: 0, y: 0 }
}
