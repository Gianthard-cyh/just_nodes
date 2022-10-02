<script setup lang="ts">
import type { EdgeData } from '../../common/types'
import Edge from './edge.vue'

const props = defineProps<{
  data: EdgeData[]
}>()
</script>

<template>
  <Edge v-for="item, i in props.data" :key="i" :data="item" fill-none stroke-2 :stroke="`url(#${item.from.type.name + item.to.type.name})`" />
</template>

<style scoped>

</style>
