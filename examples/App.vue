<script setup lang="ts">
import { NodeData } from '../package/common/types'
import type { EditorOptions } from '../package/common/types/editorData'
import { EditorData } from '../package/common/types/editorData'
import NodeEditor from '../package/nodeEditor/index.vue'

const data = new EditorData({}).addNode({ title: '123' })
const node = new NodeData({ title: '133' }).addPort({ title: '6636' }).addPort({ title: '6636' })
data.addNode(node)
</script>

<template>
  <NodeEditor :data="data" />
</template>

<style scoped>

</style>
