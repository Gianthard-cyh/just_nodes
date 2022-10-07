import { NodeData } from "./nodeData"
import { PortData } from "./portData"

export interface EdgeOptions {
  startX: number
  startY: number
  endX: number
  endY: number
  from: string
  to: string
}

export interface EdgeData {
  startX: number
  startY: number
  endX: number
  endY: number
  from: PortData
  to: PortData
}

export interface GhostEdgeData extends EdgeData {
  activated: boolean
}