import { MaybeRef, MaybeElementRef, useEventListener, useMouseInElement } from "@vueuse/core";
import { nextTick, onMounted, ref, unref } from "vue";

export interface useDraggableInElementOptions {
  target: MaybeRef<HTMLElement | SVGElement | null | undefined>,
  container: MaybeRef<HTMLElement | SVGElement | null | undefined>,
  initPos?: { x: number, y: number },
  onStart?: (x: number, y: number) => void
  onMove?: (x: number, y: number) => void
  onEnd?: (x: number, y: number) => void
}

export function useDraggableInElement(
  options: useDraggableInElementOptions
) {
  const x = ref(options.initPos ? options.initPos.x : 0)
  const y = ref(options.initPos ? options.initPos.y : 0)
  onMounted(async () => {
    await nextTick()
    if (!unref(options.container)) {
      console.log(unref(options.container))
      throw ('useDraggableInElement Error: container is' + options.container)
    }
    if (!unref(options.target)) {
      throw ('useDraggableInElement Error: target is' + options.container)
    }

    const { elementX: ex, elementY: ey } = useMouseInElement(options.container)
    const { elementX: tx, elementY: ty } = useMouseInElement(options.target)
    let offsetX = ref(0), offsetY = ref(0)
    const isDragging = ref(false)

    useEventListener(options.target, 'pointerdown', () => {
      if (!isDragging.value) {
        isDragging.value = true
        offsetX.value = tx.value
        offsetY.value = ty.value
        options.onStart?.(x.value, y.value)
      }
    })
    useEventListener(unref(options.container), 'pointermove', () => {
      if (isDragging.value) {
        x.value = ex.value - offsetX.value
        y.value = ey.value - offsetY.value
        options.onMove?.(x.value, y.value)
      }
    })
    useEventListener(unref(options.container), 'pointerup', () => {
      if (isDragging.value) {
        isDragging.value = false
        options.onEnd?.(x.value, y.value)
      }
    })
  })
  return { x, y }
}