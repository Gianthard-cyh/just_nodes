<script setup lang="ts">
import { reactive } from 'vue'
import { NodeData } from '../package/common/types'
import { EditorData } from '../package/common/types/editorData'
import NodeEditor from '../package/nodeEditor/index.vue'
import type { typeDefinition } from '../package/common/types/typeData'

const data = reactive(new EditorData({}))
const numberType: typeDefinition = { name: 'number', color: 'rgba(50,180,50)', input: 'input' }
data.defineNode({
  title: '相加',
  ports: [
    { title: 'A', type: numberType, mode: 'in' },
    { title: 'B', type: numberType, mode: 'in' },
    { title: '结果', type: numberType, mode: 'out' },
  ],
})

let jsonData = data.toJSON()
function toJSON() {
  jsonData = data.toJSON()
  console.log(jsonData)
}

function fromJSON() {
  data.fromJSON(jsonData)
}
</script>

<template>
  {{ data.toJSON() }}
  <button @click="toJSON">
    toJSON
  </button>
  <button @click="fromJSON">
    fromJSON
  </button>
  <NodeEditor :data="data" />
</template>

<style scoped>

</style>
