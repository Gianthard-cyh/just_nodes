<script setup lang="ts">
import type { linearGradientOptions } from '../../common/types/'

const props = defineProps<{ data: linearGradientOptions[] }>()
</script>

<template>
  <linearGradient v-for="item in props.data" :id="item.id" :key="item.startColor + item.endColor">
    <stop offset="20%" :stop-color="item.startColor" />
    <stop offset="80%" :stop-color="item.endColor" />
  </linearGradient>
</template>

<style scoped>

</style>
