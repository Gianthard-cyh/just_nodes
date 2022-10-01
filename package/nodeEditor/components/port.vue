<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import type { Ref } from 'vue'
import { inject, onMounted, ref } from 'vue'
import type { EdgeData } from '../../common/types'
import type { EditorData } from '../../common/types/editorData'
import type { PortData } from '../../common/types/portData'

const props = defineProps<{ data: PortData; containerRef: Ref<HTMLElement | SVGElement | null> }>()

const portRef = ref<HTMLElement | null>(null)
const { x, y, update: updatePortBounding, width, right } = useElementBounding(portRef)
const { x: cx, y: cy, update: updateContainerBounding } = useElementBounding(props.containerRef)

const globalData = inject<EditorData>('globalData')

function onPointerDown() {
  if (globalData) {
    if (globalData.ghostEdge.activated === false) {
      globalData.ghostEdge.activated = true
      globalData.ghostEdge.from = props.data
      updatePortBounding()
      updateContainerBounding()
      globalData.ghostEdge.startX = props.data.cx
      globalData.ghostEdge.startY = props.data.cy
    }
  }
}

function onPointerUp() {
  if (globalData) {
    if (globalData.ghostEdge.activated === true) {
      if (globalData.ghostEdge.from !== props.data) {
        globalData.ghostEdge.activated = false
        const edge: EdgeData = {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 0,
          from: globalData.ghostEdge.from,
          to: props.data,
        }
        globalData.edges.push(edge)
      }
    }
  }
}

onMounted(() => {
  globalData?.nodes.forEach((node) => {
    if (node.ports.find(i => (i === props.data))) {
      if (props.data.type === 'in')
        node.ports.find(i => (i === props.data))!.cx = x.value - cx.value - 9
      else if (props.data.type === 'out')
        node.ports.find(i => (i === props.data))!.cx = right.value - cx.value + 9
      node.ports.find(i => (i === props.data))!.cy = y.value - cy.value + 11
    }
  })
})
</script>

<template>
  <div ref="portRef" relative flex="~ row" items-center>
    <svg v-if="data.type === 'in'" relative width="10" height="10" left--13px>
      <circle cursor-crosshair r="4" cx="5" cy="5" color="gray" stroke-bluegray @pointerdown.stop="onPointerDown" @pointerup="onPointerUp" />
    </svg>
    <div>
      {{ props.data.title }}
    </div>
    <svg v-if="data.type === 'out'" relative width="10" height="10" right--13px>
      <circle cursor-crosshair r="4" cx="5" cy="5" color="gray" stroke-bluegray @pointerdown.stop="onPointerDown" @pointerup="onPointerUp" />
    </svg>
  </div>
</template>

<style scoped>

</style>
