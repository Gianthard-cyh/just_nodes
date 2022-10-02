import { typeDefinition } from "./typeData"

export interface PortOptions {
  title: string
  cx?: number
  cy?: number
  mode?: 'in' | 'out'
  type?: typeDefinition
}

export interface PortDefinition {
  title: string,
  mode?: 'in' | 'out'
  type?: typeDefinition
}

export class PortData implements PortOptions {
  title: string
  cx: number
  cy: number
  mode: 'in' | 'out'
  type: typeDefinition

  constructor(options: PortOptions) {
    this.title = options.title
    this.cx = options.cx ?? 0
    this.cy = options.cy ?? 0
    this.mode = options.mode ?? 'in'
    this.type = options.type ?? { color: 'rgba(200,200,200,1)', name: "any" }
  }
}