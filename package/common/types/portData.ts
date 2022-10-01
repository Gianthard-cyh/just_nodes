export interface PortOptions {
  title: string
  cx?: number
  cy?: number
  type?: 'in' | 'out'
}

export class PortData implements PortOptions {
  title: string
  cx: number
  cy: number
  type: 'in' | 'out'

  constructor(options: PortOptions) {
    this.title = options.title
    this.cx = options.cx ?? 0
    this.cy = options.cy ?? 0
    this.type = options.type ?? 'in'
  }
}