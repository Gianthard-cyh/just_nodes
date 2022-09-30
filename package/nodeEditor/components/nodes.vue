<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { NodeData } from '../../common/types'
import type { NodeOptions } from '../../common/types/nodeData'
import Node from './node.vue'

const props = defineProps<{ data: NodeData[] }>()
const count = ref(0)
const refContainer = { value: ref(null) }
</script>

<template>
  <div :ref="refContainer.value" h-full w-full>
    <Node v-for="item, i in props.data" :key="i" :data="item" :container-ref="refContainer.value" />
  </div>
</template>

<style scoped>

</style>
