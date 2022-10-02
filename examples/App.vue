<script setup lang="ts">
import { NodeData } from '../package/common/types'
import { EditorData } from '../package/common/types/editorData'
import NodeEditor from '../package/nodeEditor/index.vue'

const data = new EditorData({})
const numberType = { name: 'number', color: 'rgba(20,200,20)' }
data.defineNode({
  title: '相加',
  ports: [
    { title: 'A', type: numberType, mode: 'in' },
    { title: 'B', type: numberType, mode: 'in' },
    { title: '结果', type: numberType, mode: 'out' },
  ],
})
</script>

<template>
  <NodeEditor :data="data" />
</template>

<style scoped>

</style>
