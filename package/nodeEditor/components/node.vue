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
}>()

const nodeRef = { value: ref(null) }
const globalData = inject<EditorData>('globalData')

const { x, y } = useDraggableInElement({
  target: nodeRef.value,
  container: props.containerRef,
  initPos: { x: props.data.x, y: props.data.y },
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
    <div bg-amber-5 rounded-t-6px px2 py1 c-white border border-gray-3>
      {{ props.data.title }}
    </div>
    <div
      v-for="item, i in props.data.ports" :key="i" px2 py1 border-gray-3 border-x border-b
      :class="{ 'rounded-b-6px': i === props.data.ports.length - 1 }"
    >
      <Port :data="item" :container-ref="props.containerRef" />
    </div>
  </div>
</template>

<style scoped>

</style>
