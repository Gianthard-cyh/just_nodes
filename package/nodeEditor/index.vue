<script setup lang="ts">
import { Ref, computed, onMounted, provide, reactive, ref, watch, watchEffect } from 'vue'

import { useEventListener, useFps, useMouseInElement } from '@vueuse/core'
import type { EditorData } from '../common/types/editorData'
import type { NodeData, linearGradientOptions } from '../common/types'
import type { PortData } from '../common/types/portData'
import Nodes from './components/nodes.vue'
import Edges from './components/edges.vue'
import Menu from './components/menu.vue'
import GradientDefs from './components/gradientDefs.vue'

const props = defineProps<{ data: EditorData }>()
const emits = defineEmits<(e: 'update:data') => void>()
const height = ref(500)
const width = ref(1000)

const editorRef = { value: ref<HTMLElement | null>(null) }

const data = reactive(props.data)

function findPort(port: PortData): NodeData | null {
  let result: NodeData | null = null
  data.nodes.forEach((node) => {
    if (node.ports.find(i => (port === i)))
      result = node
  })
  return result
}

const { elementX: x, elementY: y } = useMouseInElement(editorRef.value)

watch(data, () => {
  data.edges.forEach((edge) => {
    if (!findPort(edge.from))
      return
    edge.startX = edge.from.cx + findPort(edge.from)!.x
    edge.startY = edge.from.cy + findPort(edge.from)!.y
    if (!findPort(edge.to))
      return
    edge.endX = edge.to.cx + findPort(edge.to)!.x
    edge.endY = edge.to.cy + findPort(edge.to)!.y
  })

  if (findPort(data.ghostEdge.from)) {
    data.ghostEdge.startX = data.ghostEdge.from.cx + findPort(data.ghostEdge.from)!.x
    data.ghostEdge.startY = data.ghostEdge.from.cy + findPort(data.ghostEdge.from)!.y
  }
})

watchEffect(() => {
  data.ghostEdge.endX = x.value
  data.ghostEdge.endY = y.value
})

useEventListener(editorRef.value, 'pointerup', () => {
  data.ghostEdge.activated = false
})

const isMenuOpen = ref(false)
const mx = ref(0)
const my = ref(0)
const menuUpon = ref<NodeData>()
function onRightClick() {
  isMenuOpen.value = true
  mx.value = x.value
  my.value = y.value
}
function onMenuClose() {
  isMenuOpen.value = false
  menuUpon.value = undefined
}
onMounted(() => {
  editorRef.value.value!.oncontextmenu = () => {
    onRightClick()
    return false
  }
})
provide('openMenuOnNode', (node: NodeData) => {
  menuUpon.value = node
  onRightClick()
})

provide('globalData', data)

const gradientData = computed<linearGradientOptions[]>(() => {
  return data.edges.concat(data.ghostEdge).map((item) => {
    return { startColor: item.from.type.color, endColor: item.to.type.color, id: item.from.type.name + item.to.type.name }
  })
})

const fps = useFps()
</script>

<template>
  <svg :ref="editorRef.value" h-full w-full @click.right="onRightClick" @click.left="onMenuClose">
    <defs>
      <GradientDefs :data="gradientData" />
    </defs>
    <Edges :data="data.edges" />
    <Edges v-if="data.ghostEdge.activated" :data="[data.ghostEdge]" />
    <foreignObject :height="3 * height" :width="3 * width">
      <Nodes :data="data.nodes" />
      <Menu v-if="isMenuOpen" fixed :style="{ left: `${mx}px`, top: `${my}px` }" :container-ref="editorRef.value" select-none :data="{ nodeTypes: props.data.nodeTypes, nodeUpon: menuUpon }" @close="onMenuClose" />
    </foreignObject>
  </svg>
</template>

<style scoped>

</style>
