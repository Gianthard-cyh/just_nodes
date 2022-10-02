export interface PortOptions {
  title: string
  cx?: number
  cy?: number
  mode?: 'in' | 'out'
}

export interface PortDefinition {
  title: string,

}

export class PortData implements PortOptions {
  title: string
  cx: number
  cy: number
  mode: 'in' | 'out'

  constructor(options: PortOptions) {
    this.title = options.title
    this.cx = options.cx ?? 0
    this.cy = options.cy ?? 0
    this.mode = options.mode ?? 'in'
  }
}