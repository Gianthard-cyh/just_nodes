<script setup lang="ts">
import { reactive } from 'vue'
import type { NodeData, PortData } from '../package/common/types'

import { EditorData } from '../package/common/types/editorData'
import NodeEditor from '../package/nodeEditor/index.vue'
import type { typeDefinition } from '../package/common/types/typeData'

const data = reactive(new EditorData({}))
const numberType: typeDefinition = { name: 'number', color: 'rgba(50,180,50)', input: 'input' }
const stringType: typeDefinition = { name: 'string', color: 'rgb(50,50,100)', input: 'input' }
const stringTypeNoInput: typeDefinition = { name: 'string', color: 'rgb(50,50,100)', input: 'none' }
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

data.defineNode({
  title: '输出字符串',
  ports: [
    { title: '输出', type: stringTypeNoInput, mode: 'in' },
  ],
})

const mapNodesToPorts = new Map<PortData, NodeData>()
const map = new Map<PortData, PortData | undefined>()

function output(str: PortData) {
  alert(handle(map.get(str)!))
}

function concatString(A: PortData, B: PortData) {
  return (map.get(A)
    ? handle(map.get(A)!)
    : (A.value as string))
   + (map.get(B)
     ? handle(map.get(B)!)
     : (B.value as string))
}

function stringify(num: PortData) {
  return map.get(num) ? (handle(map.get(num)!) as number).toString() : parseFloat(num.value! as string).toString()
}

function add(A: PortData, B: PortData) {
  return (map.get(A)
    ? handle(map.get(A)!)
    : (parseFloat(A.value as string) as number))
   + (map.get(B)
     ? handle(map.get(B)!)
     : (parseFloat(B.value as string) as number))
}

function handle(port: PortData): any {
  let result: any
  if (mapNodesToPorts.get(port)?.title === '相加')
    result = add(mapNodesToPorts.get(port)!.ports[0], mapNodesToPorts.get(port)!.ports[1])
  if (mapNodesToPorts.get(port)?.title === '数字转换为字符串')
    result = stringify(mapNodesToPorts.get(port)!.ports[0])
  if (mapNodesToPorts.get(port)?.title === '字符串拼接')
    result = concatString(mapNodesToPorts.get(port)!.ports[0], mapNodesToPorts.get(port)!.ports[1])
  return result
}

function run() {
  let count = 0
  data.nodes.forEach((node) => {
    if (node.title === '输出字符串')
      count++
  })
  if (count >= 2) {
    alert('重复的输出！')
    return
  }
  if (count === 0) {
    alert('没有输出！')
    return
  }

  data.edges.forEach((edge) => {
    map.set(edge.to, edge.from)
  })

  data.nodes.forEach((node) => {
    node.ports.forEach((port) => {
      mapNodesToPorts.set(port, node)
    })
  })

  const result = data.nodes.find(node => (node.title === '输出字符串'))
  if (result)
    output(result.ports[0])
}

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
  <button @click="run">
    run
  </button>
  <NodeEditor :data="data" />
</template>

<style scoped>

</style>
