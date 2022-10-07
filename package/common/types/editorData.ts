import { reactive, ref } from "vue";
import { EdgeData, EdgeOptions, GhostEdgeData } from "./edgeData";
import { NodeData, NodeDefinition, NodeOptions } from "./nodeData";
import { PortData } from "./portData";

export interface EditorOptions {
  nodes?: NodeDefinition[]
  nodeTypes?: NodeDefinition[]
  edges?: EdgeOptions[]
}

export class EditorData {
  nodes: NodeData[]
  edges: EdgeData[]
  nodeTypes: NodeDefinition[]
  ghostEdge: GhostEdgeData

  findPortByUid(uid: string): PortData | undefined {
    let result: PortData | undefined
    this.nodes.forEach(
      node => {
        if (!result)
          result = node.ports.find(port => (uid == port.uid))
      }
    )
    return result
  }

  constructor(
    data: EditorOptions
  ) {
    this.nodes = data.nodes?.map(
      (nodeOptions) => (
        new NodeData({
          title: nodeOptions.title,
          ports: nodeOptions.ports?.map((item) => new PortData(item)),
          x: nodeOptions.x ?? 0,
          y: nodeOptions.y ?? 0,
          uid: nodeOptions.uid
        })
      )
    ) ?? []
    if (data.edges) {
      this.edges = data.edges.map(
        (edgeOptions): EdgeData => ({
          startX: edgeOptions.startX,
          endX: edgeOptions.endX,
          startY: edgeOptions.startY,
          endY: edgeOptions.endY,
          from: this.findPortByUid(edgeOptions.from)!,
          to: this.findPortByUid(edgeOptions.to)!,
        })
      )
    } else {
      this.edges = []
    }
    this.ghostEdge = reactive({
      startX: ref(0), startY: ref(0), endX: ref(0), endY: ref(0),
      activated: false,
      from: new PortData({ title: "" }),
      to: new PortData({ title: "" }),
    })
    this.nodeTypes = data.nodeTypes ?? []
  }

  addNode(node: NodeData): EditorData
  addNode(node: NodeOptions): EditorData
  addNode(node: NodeData | NodeOptions) {
    if (node instanceof NodeData) { this.nodes.push(node) }
    else { this.nodes.push(new NodeData(node)) }
    return this
  }

  defineNode(node: NodeDefinition) {
    this.nodeTypes.push(node)
    return this
  }

  addDefinedNode(node: NodeDefinition) {
    this.nodes.push(new NodeData({
      title: node.title,
      ports: node.ports?.map((item) => new PortData(item)),
      x: node.x ?? 0,
      y: node.y ?? 0
    }))
  }

  toJSON(): string {
    return JSON.stringify({
      nodes: this.nodes,
      nodeTypes: this.nodeTypes,
      edges: this.edges.map(
        (edge): EdgeOptions => (
          {
            startX: edge.startX,
            endX: edge.endX,
            startY: edge.startY,
            endY: edge.endY,
            from: edge.from.uid,
            to: edge.to.uid
          }
        )
      )
    })
  }
  fromJSON(json: string) {
    const data: EditorOptions = JSON.parse(json)
    this.nodes = data.nodes?.map(
      (nodeOptions) => (
        new NodeData({
          title: nodeOptions.title,
          ports: nodeOptions.ports?.map((item) => new PortData(item)),
          x: nodeOptions.x ?? 0,
          y: nodeOptions.y ?? 0,
          uid: nodeOptions.uid
        })
      )
    ) ?? []
    console.log(data)
    if (data.edges) {
      this.edges = data.edges.map(
        (edgeOptions): EdgeData => ({
          startX: edgeOptions.startX,
          endX: edgeOptions.endX,
          startY: edgeOptions.startY,
          endY: edgeOptions.endY,
          from: this.findPortByUid(edgeOptions.from)!,
          to: this.findPortByUid(edgeOptions.to)!,
        })
      )
    } else {
      this.edges = []
    }
    console.log(this)
  }
}