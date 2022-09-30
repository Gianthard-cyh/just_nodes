<script setup lang="ts">
import { computed } from 'vue'
import type { EdgeData } from '../../common/types/edgeData'

const props = defineProps<{
  data: EdgeData
}>()
const d = computed(() => {
  return `
  M ${props.data.startX} ${props.data.startY} 
  q ${(props.data.endX - props.data.startX) / 4} 0 ${(props.data.endX - props.data.startX) / 2} ${(props.data.endY - props.data.startY) / 2}
  q ${(props.data.endX - props.data.startX) / 4} ${(props.data.endY - props.data.startY) / 2} ${(props.data.endX - props.data.startX) / 2} ${(props.data.endY - props.data.startY) / 2}
  `
})
</script>

<template>
  <path :d="d" />
</template>

<style scoped>

</style>
