<script setup lang="ts">
import { NodeData } from '../package/common/types'
import { EditorData } from '../package/common/types/editorData'
import NodeEditor from '../package/nodeEditor/index.vue'

const data = new EditorData({}).addNode({ title: '123' })
const node1 = new NodeData({ title: '133' }).addPort({ title: '6636', type: 'out' }).addPort({ title: '6636' })
const node2 = new NodeData({ title: '133' }).addPort({ title: '6636' }).addPort({ title: '6636' })
data.addNode(node1).addNode(node2).defineNode({ title: 'defined node', ports: [{ title: 'defined port', type: 'out' }] })
  .defineNode({ title: 'defined node 2', ports: [{ title: 'defined port 2', type: 'in' }] })
</script>

<template>
  <NodeEditor :data="data" />
</template>

<style scoped>

</style>
