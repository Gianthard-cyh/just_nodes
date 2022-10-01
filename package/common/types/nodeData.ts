import { PortData, PortOptions } from "./portData"

export interface NodeOptions {
  title: string
  ports?: PortData[]
  x?: number
  y?: number
}

export interface NodeDefinition {
  title: string,
  ports?: PortOptions[]
}

export class NodeData implements NodeOptions {

  title: string
  ports: PortData[]
  x: number
  y: number


  constructor(
    options: NodeOptions
  ) {
    this.title = options.title
    this.ports = options.ports ?? []
    this.x = options.x ?? 0
    this.y = options.y ?? 0
  }

  addPort(port: PortOptions): NodeData
  addPort(port: PortData): NodeData
  addPort(port: PortOptions | PortData) {
    if (port instanceof PortData) {
      this.ports.push(port)
    } else {
      this.ports.push(new PortData(port))
    }
    return this
  }

}
