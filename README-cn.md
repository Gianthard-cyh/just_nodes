### [English](./README.md) | 简体中文
# just-nodes
一个仿 blender 节点编辑器。

使用 Vue3 + TS + UnoCSS + Vueuse 开发

### [LiveDemo](https://melodic-pavlova-fb1640.netlify.app/)
## 安装
```bash
npm i just-nodes
```

## 使用
### App.vue
```html
<script setup lang="ts">
import { reactive } from 'vue'
import { NodeData } from 'just-nodes/common/types'
import { EditorData } from 'just-nodes/common/types/editorData'
import NodeEditor from 'just-nodes/nodeEditor/index.vue'
import type { typeDefinition } from 'just-nodes/common/types/typeData'

const data = reactive(new EditorData({}))
const numberType: typeDefinition = { name: 'number', color: 'rgba(50,180,50)', input: 'input' }
const stringType: typeDefinition = { name: 'string', color: 'rgb(50,50,100)', input: 'input' }
data.defineNode({
  title: '相加',
  ports: [
    { title: 'A', type: numberType, mode: 'in' },
    { title: 'B', type: numberType, mode: 'in' },
    { title: '结果', type: numberType, mode: 'out' },
  ],
})

data.defineNode({
  title: '数字转换为字符串',
  ports: [
    { title: '输入', type: numberType, mode: 'in' },
    { title: '结果', type: stringType, mode: 'out' },
  ],
})

data.defineNode({
  title: '字符串拼接',
  ports: [
    { title: 'A', type: stringType, mode: 'in' },
    { title: 'B', type: stringType, mode: 'in' },
    { title: '结果', type: stringType, mode: 'out' },
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

```