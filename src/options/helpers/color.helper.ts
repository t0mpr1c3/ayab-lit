import { ColorEnum } from '../../shared/models/ColorEnum.model'

export class ColorHelper {
  static iconInitialColor(name: string): string {
    return name === 'start' ? 'orange' : 'green'
  }

  static iconName(color: string): string {
    return color === 'orange'
      ? 'layout-sidebar-inset'
      : 'layout-sidebar-inset-reverse'
  }

  static colorCode(color: string): ColorEnum {
    return color === 'orange' ? ColorEnum.orange : ColorEnum.green
  }
}
