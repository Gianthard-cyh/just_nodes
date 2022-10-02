<script setup lang="ts">
import { ref } from 'vue'
import type { NodeData } from '../../common/types'
import Node from './node.vue'

const props = defineProps<{ data: NodeData[] }>()
const count = ref(0)
const refContainer = { value: ref(null) }
</script>

<template>
  <div :ref="refContainer.value" h-full w-full>
    <Node v-for="item, i in props.data" :key="item.uid" :data="item" :container-ref="refContainer.value" shadow :activated="i === props.data.length - 1" />
  </div>
</template>

<style scoped>

</style>
