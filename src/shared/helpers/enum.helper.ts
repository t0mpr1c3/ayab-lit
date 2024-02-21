export class EnumHelper {
  static enumCount(enumName: any): number {
    let count = 0
    for (let item in enumName) {
      if (isNaN(Number(item))) {
        count++
      }
    }
    return count
  }

  static enumArray(enumName: any): string[] {
    let count = this.enumCount(enumName)
    let keys = Array.from(Array(count).keys())
    return keys.map((key) => this.pretty(enumName[key]))
  }

  static pretty(str: string): string {
    return str
      .replace(this._re1, ', ')
      .replace(this._re2, ' ')
      .replace(this._re3, ':')
  }

  static _re1 = new RegExp('(?<=[0-9])_', 'g')
  static _re2 = new RegExp('_', 'g')
  static _re3 = new RegExp('\\$', 'g')
}
