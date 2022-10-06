<script setup lang="ts">
import { NodeData } from '../package/common/types'
import { EditorData } from '../package/common/types/editorData'
import NodeEditor from '../package/nodeEditor/index.vue'
import type { typeDefinition } from '../package/common/types/typeData'

const data = new EditorData({})
const numberType: typeDefinition = { name: 'number', color: 'rgba(50,180,50)', input: 'input' }
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
