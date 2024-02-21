export class Scale {
  x: number
  y: number

  constructor(...args: number[]) {
    if (args.length === 0) {
      this.x = 1
      this.y = 1
    } else if (args.length === 1) {
      this.x = args[0]!
      this.y = args[0]!
    } else {
      this.x = args[0]!
      this.y = args[1]!
    }
  }
}
