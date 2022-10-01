<script setup lang="ts">
import type { Ref } from 'vue'
import { provide, reactive, ref, watch, watchEffect } from 'vue'
import { useElementBounding, useEventListener, useMouseInElement } from '@vueuse/core'
import type { EditorData } from '../common/types/editorData'
import type { NodeData } from '../common/types'
import type { PortData } from '../common/types/portData'
import Nodes from './components/nodes.vue'
import Edges from './components/edges.vue'

const props = defineProps<{ data: EditorData }>()
const emits = defineEmits<(e: 'update:data') => void>()
const height = ref(500)
const width = ref(1000)

const editorRef = ref<HTMLElement | null>(null)

function findPort(port: PortData): NodeData | null {
  let result: NodeData | null = null
  props.data.nodes.forEach((node) => {
    if (node.ports.find(i => (port === i)))
      result = node
  })
  return result
}

const { elementX: x, elementY: y } = useMouseInElement(editorRef)

watch(props.data, () => {
  props.data.edges.forEach((edge) => {
    if (!findPort(edge.from))
      return

    edge.startX = +findPort(edge.from)!.x
    edge.startY = edge.from.cy + findPort(edge.from)!.y
    if (!findPort(edge.to))
      return
    edge.endX = +findPort(edge.to)!.x
    edge.endY = edge.to.cy + findPort(edge.to)!.y
  })

  if (findPort(props.data.ghostEdge.from)) {
    props.data.ghostEdge.startX = +findPort(props.data.ghostEdge.from)!.x
    props.data.ghostEdge.startY = props.data.ghostEdge.from.cy + findPort(props.data.ghostEdge.from)!.y
  }
  emits('update:data')
})

watchEffect(() => {
  props.data.ghostEdge.endX = x.value
  props.data.ghostEdge.endY = y.value
})

useEventListener(editorRef, 'pointerup', () => {
  props.data.ghostEdge.activated = false
})
provide('globalData', props.data)
</script>

<template>
  {{ props.data }}
  <svg ref="editorRef" h-full w-full>
    <Edges :data="props.data.edges" />
    <Edges v-if="props.data.ghostEdge.activated" :data="[props.data.ghostEdge]" />
    <foreignObject :height="3 * height" :width="3 * width">
      <Nodes :data="props.data.nodes" />
    </foreignObject>
  </svg>
</template>

<style scoped>

</style>
