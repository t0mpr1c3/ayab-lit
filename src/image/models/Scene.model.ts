import { AlignmentEnum } from '../../shared/models/AlignmentEnum.model'
import { ColorEnum } from '../../shared/models/ColorEnum.model'

export interface Scene {
  startRow: number
  startColor: ColorEnum
  startNeedle: number
  stopColor: ColorEnum
  stopNeedle: number
  alignment: AlignmentEnum
  knitSide: boolean
  width: number
}
