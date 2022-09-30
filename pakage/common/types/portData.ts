export interface PortOptions {
  title: string
  cx?: number
  cy?: number
}

export class PortData implements PortOptions {
  title: string
  cx: number
  cy: number
  constructor(options: PortOptions) {
    this.title = options.title
    this.cx = options.cx ?? 0
    this.cy = options.cy ?? 0
  }
}