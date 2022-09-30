<script setup lang="ts">
import type { Ref } from 'vue'
import { provide, reactive, ref, watch, watchEffect } from 'vue'
import { useElementBounding, useEventListener, useMouseInElement } from '@vueuse/core'
import { EditorData } from '../common/types/editorData'
import { NodeData } from '../common/types'
import { PortData } from '../common/types/portData'
import Nodes from './components/nodes.vue'
import Edges from './components/edges.vue'

const height = ref(500)
const width = ref(1000)

const editorRef = ref<HTMLElement | null>(null)

const data: EditorData = reactive(new EditorData({
  nodes: [
    new NodeData({ title: 'node', ports: [new PortData({ title: 'port' }), new PortData({ title: 'port' })] }),
    new NodeData({ title: 'node', ports: [new PortData({ title: 'port' }), new PortData({ title: 'port' })] }),
  ],
  edges: [
  ],
}))

function findPort(port: PortData): NodeData | null {
  let result: NodeData | null = null
  data.nodes.forEach((node) => {
    if (node.ports.find(i => (port === i)))
      result = node
  })
  return result
}

const { elementX: x, elementY: y } = useMouseInElement(editorRef)

watch(data, () => {
  data.edges.forEach((edge) => {
    if (!findPort(edge.from))
      return

    edge.startX = +findPort(edge.from)!.x
    edge.startY = edge.from.cy + findPort(edge.from)!.y
    if (!findPort(edge.to))
      return
    edge.endX = +findPort(edge.to)!.x
    edge.endY = edge.to.cy + findPort(edge.to)!.y
  })

  if (findPort(data.ghostEdge.from)) {
    data.ghostEdge.startX = +findPort(data.ghostEdge.from)!.x
    data.ghostEdge.startY = data.ghostEdge.from.cy + findPort(data.ghostEdge.from)!.y
  }
})

watchEffect(() => {
  data.ghostEdge.endX = x.value
  data.ghostEdge.endY = y.value
})

useEventListener(editorRef, 'pointerup', () => {
  data.ghostEdge.activated = false
})
provide('globalData', data)
</script>

<template>
  {{ data }}
  <svg ref="editorRef" h-full w-full>
    <Edges :data="data.edges" />
    <Edges v-if="data.ghostEdge.activated" :data="[data.ghostEdge]" />
    <foreignObject :height="3 * height" :width="3 * width">
      <Nodes :data="data.nodes" />
    </foreignObject>
  </svg>
</template>

<style scoped>

</style>
