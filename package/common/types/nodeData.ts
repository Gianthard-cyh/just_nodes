import { rand, timestamp, useTimestamp } from "@vueuse/core"
import { PortData, PortOptions } from "./portData"
import { uid } from "../utils"

export interface NodeOptions {
  title: string
  ports?: PortData[]
  x?: number
  y?: number
}

export interface NodeDefinition {
  title: string,
  ports?: PortOptions[]
  x?: number
  y?: number
}

export class NodeData implements NodeOptions {

  title: string
  ports: PortData[]
  x: number
  y: number
  uid: string

  constructor(
    options: NodeOptions
  ) {
    this.title = options.title
    this.ports = options.ports ?? []
    this.x = options.x ?? 0
    this.y = options.y ?? 0
    this.uid = uid().uid
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
