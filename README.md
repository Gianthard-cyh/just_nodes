
![GitHub](https://img.shields.io/github/license/Gianthard-cyh/just_nodes)


>### This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
>###  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
### English | [简体中文](./README-cn.md)

# just-nodes
A node editor imitates blender's built-in node editor.

Developed by Vue3 + TS + UnoCSS + Vueuse.

### [LiveDemo](https://melodic-pavlova-fb1640.netlify.app/)
## Installation
```bash
npm i just-nodes
```

## Usage
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
  title: 'Add',
  ports: [
    { title: 'A', type: numberType, mode: 'in' },
    { title: 'B', type: numberType, mode: 'in' },
    { title: 'result', type: numberType, mode: 'out' },
  ],
})

data.defineNode({
  title: 'NumberToString',
  ports: [
    { title: 'input', type: numberType, mode: 'in' },
    { title: 'result', type: stringType, mode: 'out' },
  ],
})

data.defineNode({
  title: 'StringAdd',
  ports: [
    { title: 'A', type: stringType, mode: 'in' },
    { title: 'B', type: stringType, mode: 'in' },
    { title: 'result', type: stringType, mode: 'out' },
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