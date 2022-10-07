<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { useElementBounding, useResizeObserver } from '@vueuse/core'
import type { Ref } from 'vue'
import { inject, onMounted, ref, watch } from 'vue'

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
      const result = globalData.edges.find(i => (i.to === props.data))
      if (result) {
        globalData.edges.splice(globalData.edges.indexOf(result), 1)
        globalData.ghostEdge.activated = true
        globalData.ghostEdge.from = result.from
        updatePortBounding()
        updateContainerBounding()
      }
      else {
        globalData.ghostEdge.activated = true
        globalData.ghostEdge.from = props.data
        updatePortBounding()
        updateContainerBounding()
        globalData.ghostEdge.startX = props.data.cx
        globalData.ghostEdge.startY = props.data.cy
      }
    }
  }
}

function onPointerUp() {
  if (globalData) {
    if (globalData.ghostEdge.activated === true) {
      if (globalData.ghostEdge.from !== props.data) {
        const edge: EdgeData = {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 0,
          from: globalData.ghostEdge.from.mode === 'out' ? globalData.ghostEdge.from : props.data,
          to: globalData.ghostEdge.from.mode === 'out' ? props.data : globalData.ghostEdge.from,
        }
        if (
          (!globalData.edges.find(i =>
            (((i.from === globalData.ghostEdge.from) && (i.to === props.data)) || ((i.to === globalData.ghostEdge.from && (i.from === props.data)))),
          ))
          && (globalData.ghostEdge.from.type.name === props.data.type.name || globalData.ghostEdge.from.type.name === 'any' || props.data.type.name === 'any')
          && (globalData.ghostEdge.from.mode !== props.data.mode)
        ) {
          const result = globalData.edges.find(i => (i.to === props.data))
          if (result)
            globalData.edges.splice(globalData.edges.indexOf(result), 1)
          globalData.ghostEdge.activated = false
          globalData.edges.push(edge)
        }
      }
    }
  }
}

function updatePos() {
  if (props.data) {
    if (props.data.mode === 'in')
      props.data.cx = x.value - cx.value - 9
    else if (props.data.mode === 'out')
      props.data.cx = right.value - cx.value + 9
    props.data.cy = y.value - cy.value + 11
  }
}
onMounted(updatePos)
useResizeObserver(props.containerRef, updatePos)
</script>

<template>
  <div ref="portRef" relative flex="~ row" items-center :class="{ 'justify-end': props.data.mode === 'out' }">
    <svg v-if="data.mode === 'in'" relative width="10" height="10" left--13px>
      <circle cursor-crosshair r="4" cx="5" cy="5" :fill="props.data.type.color" stroke-bluegray @pointerdown.stop="onPointerDown" @pointerup="onPointerUp" />
    </svg>
    <div text-sm>
      {{ props.data.title }}
    </div>
    <div
      v-if="props.data.type.input === 'input' && props.data.mode !== 'out'
        && !globalData?.edges.find(i => (i.from === props.data || i.to === props.data))
      "
    >
      <input v-model="props.data.value" max-w-100px mx-2 rounded-3px px-1 py3px outline-none border border-gray-2 hover="bg-gray-1 border-gray-3" focus:bg-gray-1 @pointerdown.stop="() => {}">
    </div>
    <svg v-if="data.mode === 'out'" relative width="10" height="10" right--13px>
      <circle cursor-crosshair r="4" cx="5" cy="5" :fill="props.data.type.color" stroke-bluegray @pointerdown.stop="onPointerDown" @pointerup="onPointerUp" />
    </svg>
  </div>
</template>

<style scoped>

</style>
