import { EnumHelper } from '../helpers/enum.helper'
import { SettingsHelper } from '../helpers/settings.helper'
import { AlignmentEnum } from './AlignmentEnum.model'
import { MachineEnum } from './MachineEnum.model'
import { ModeEnum } from './ModeEnum.model'

// Type of generic setting value
export type TSetting = MachineEnum | ModeEnum | AlignmentEnum | boolean

// FIXME add setting for language locale
// FIXME possibly add another setting for aspect ratio

export interface Setting {
  key: string
  title: string
  type: string
  default: TSetting
  enum?: string[]
}

export const settings: Setting[] = [
  {
    key: 'machine',
    title: 'Machine',
    type: 'MachineEnum',
    default: MachineEnum.KH910_KH950i,
    enum: EnumHelper.enumArray(MachineEnum),
  },
  {
    key: 'mode',
    title: 'Default knitting mode',
    type: 'ModeEnum',
    default: ModeEnum.Single_Bed,
    enum: EnumHelper.enumArray(ModeEnum),
  },
  {
    key: 'infRepeat',
    title: 'Infinite repeat',
    type: 'boolean',
    default: false,
  },
  {
    key: 'alignment',
    title: 'Default alignment',
    type: 'AlignmentEnum',
    default: AlignmentEnum.Center,
    enum: EnumHelper.enumArray(AlignmentEnum),
  },
  {
    key: 'knitSide',
    title: 'Default knit side image',
    type: 'boolean',
    default: false,
  },
  {
    key: 'quietMode',
    title: 'Quiet mode',
    type: 'boolean',
    default: true,
  },
]

// Create `Settings` interface from `settings` object
// https://stackoverflow.com/questions/45771307/typescript-dynamically-create-interface
type MapSchemaTypes = {
  MachineEnum: MachineEnum
  ModeEnum: ModeEnum
  AlignmentEnum: AlignmentEnum
  boolean: boolean
}
type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
  -readonly [K in keyof T]: MapSchemaTypes[T[K]]
}
function asSchema<T extends Record<string, keyof MapSchemaTypes>>(t: T): T {
  return t
}

const settingsSchema = asSchema(
  SettingsHelper.reduce(
    settings.map((setting) => ({
      key: setting.key,
      value: setting.type,
    }))
  )
)
export type Settings = MapSchema<typeof settingsSchema>

export const defaultSettings: Settings = SettingsHelper.reduce(
  settings.map((setting) => ({
    key: setting.key,
    value: setting.default,
  }))
)

export function mapSettings<T>(func: (setting: Setting) => T): T[] {
  return Array.from(Array(settings.length).keys()).map((idx) => {
    let setting: Setting = settings[idx]!
    return func(setting)
  })
}
