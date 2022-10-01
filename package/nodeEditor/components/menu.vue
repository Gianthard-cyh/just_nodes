<script setup lang="ts">
import { useMouse, useMouseInElement } from '@vueuse/core'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import type { MenuData } from '../../common/types'
import type { EditorData } from '../../common/types/editorData'
import type { NodeDefinition } from '../../common/types/nodeData'

const props = defineProps<{ data: MenuData; containerRef: Ref<HTMLElement | SVGElement | null> }>()
const emits = defineEmits<{ (e: 'close'): void }>()
const mode = ref('menu')

const { elementX, elementY } = useMouseInElement(props.containerRef)

const globalData = inject<EditorData>('globalData')
function onCreate() {
  mode.value = 'create'
}
function onCreateNode(node: NodeDefinition) {
  globalData?.addDefinedNode({
    title: node.title,
    ports: node.ports,
    x: elementX.value,
    y: elementY.value,
  })
  emits('close')
}
</script>

<template>
  <div min-w-200px border="~ gray-3" rounded-6px bg-white>
    <div v-if="mode === 'menu'">
      <div hover:bg-gray-2 py1 px2 border-b border-gray-3 text-sm @click.stop="onCreate">
        新建
      </div>
      <div hover:bg-gray-2 py1 px2 text-sm>
        删除
      </div>
    </div>
    <div v-if="mode === 'create'">
      <div v-for="node in props.data.nodeTypes" :key="node.title" hover:bg-gray-2 py1 px2 border-b border-gray-3 text-sm @click.stop="onCreateNode(node)">
        {{ node }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
