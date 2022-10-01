import { reactive, ref } from "vue";
import { EdgeData, GhostEdgeData } from "./edgeData";
import { NodeData, NodeDefinition, NodeOptions } from "./nodeData";
import { PortData } from "./portData";

export interface EditorOptions {
  nodes?: NodeData[]
  nodeTypes?: NodeDefinition[]
  edges?: EdgeData[]
}

export class EditorData {
  nodes: NodeData[]
  edges: EdgeData[]
  nodeTypes: NodeDefinition[]
  ghostEdge: GhostEdgeData

  constructor(
    options: EditorOptions
  ) {
    this.nodes = options.nodes ?? []
    this.edges = options.edges ?? []
    this.ghostEdge = reactive({
      startX: ref(0), startY: ref(0), endX: ref(0), endY: ref(0),
      activated: false,
      from: new PortData({ title: "" }),
      to: new PortData({ title: "" }),
    })
    this.nodeTypes = options.nodeTypes ?? []
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
      title: node.title, ports: node.ports?.map((item) => new PortData(item))
    }))
  }
}