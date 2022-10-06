<script setup lang="ts">
import type { Ref } from 'vue'
import { inject, ref } from 'vue'

import { useDraggableInElement } from '../../common/composables/useDraggableInElement'
import type { EditorData } from '../../common/types/editorData'
import type { NodeData } from '../../common/types/index'
import Port from './port.vue'

const props = defineProps<{
  data: NodeData
  containerRef: Ref<HTMLElement | SVGElement | null>
  activated: boolean
}>()

const nodeRef = { value: ref(null) }
const globalData = inject<EditorData>('globalData')

const { x, y } = useDraggableInElement({
  target: nodeRef.value,
  container: props.containerRef,
  initPos: { x: props.data.x, y: props.data.y },
  onStart: () => {
    if (globalData) {
      [globalData.nodes[globalData.nodes.indexOf(props.data)], globalData.nodes[globalData.nodes.length - 1]]
      = [globalData.nodes[globalData.nodes.length - 1], globalData.nodes[globalData.nodes.indexOf(props.data)]]
    }
  },
  onMove: (x, y) => {
    if (globalData) {
      globalData.nodes[globalData.nodes.indexOf(props.data)].x = x
      globalData.nodes[globalData.nodes.indexOf(props.data)].y = y
    }
  },
})
</script>

<template>
  <div :ref="nodeRef.value" opacity-80 bg-white rounded-6px fixed select-none :style="{ left: `${x}px`, top: `${y}px` }">
    <div text-sm bg-blue-7 rounded-t-6px px2 py1 c-white border-1 border-b-gray-3 :class="{ 'border-gray-5': props.activated, ' border-gray-3': !props.activated }">
      {{ props.data.title }}
    </div>
    <div
      v-for="item, i in props.data.ports" :key="i" px2 py1 border-gray-3 border-x-1 border-b-1
      :class="{ 'rounded-b-6px': i === props.data.ports.length - 1, 'border-gray-5': props.activated, ' border-gray-3': !props.activated, 'border-b-gray-3': !(i === props.data.ports.length - 1) }"
    >
      <Port :data="item" :container-ref="nodeRef.value" />
    </div>
  </div>
</template>

<style scoped>

</style>
