import { reactive, ref } from "vue";
import { EdgeData, GhostEdgeData } from "./edgeData";
import { NodeData } from "./nodeData";
import { PortData } from "./portData";

export interface EditorOptions {
  nodes?: NodeData[]
  edges?: EdgeData[]
}

export class EditorData {
  nodes: NodeData[]
  edges: EdgeData[]
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
  }
}