# 设计笔记
## 2022.10.1 关于Api的一些想法
我觉得它应该看起来像这样:
```html
<script setup lang="ts">
import { EditorData } from '../package/common/types/editorData'
import NodeEditor from '../package/nodeEditor/index.vue'
</script>

<template>
  <NodeEditor :data="data" />
</template>

<style scoped>
</style>
```
### feature 示例 

- [ ] 节点预设/注册
```javascript
data.registerNodes([{
  color:"rgba(180,50,50)"
  titie:"lorem ipsum"
  port:[
    {
      title:"input port"
      mode:"in"
      color:"rgba(50,30,30)"
    },
    {
      title:"output port"
      mode:"out"
      unoColor:"red-3" //unoCSS 预设颜色
    }
  ]
}])
```

- [ ] 渲染自定义组件 & 传入特定参数
```javascript
data.registerNodes([{
  color:"rgba(180,50,50)"
  titie:"lorem ipsum"
  port:[
    {
      title:"input port"
      mode:"in"
      render:(port)=>{
        return h(
          {
            someComp,
            {
              // props
            }
            {
              // slots
            }
          }
        )
      }
    },
    {
      title:"output port"
      mode:"out"
    }
  ]
}])
```