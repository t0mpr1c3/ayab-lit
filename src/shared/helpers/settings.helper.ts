import { TSetting, defaultSettings } from '../models/Settings.model'

type KV<T> = {
  key: string
  value: T
}
export class SettingsHelper {
  static reduce<T>(array: KV<T>[]) {
    return array.reduce(
      (pre, element) => ({
        ...pre,
        [element.key]: element.value,
      }),
      {}
    )
  }

  static formSettings(f: FormData): Record<string, TSetting> {
    return SettingsHelper.reduce(
      Object.entries(defaultSettings).map((entry) => {
        let k = entry[0]
        let v: any = f.get(k)
        return {
          key: k,
          value:
            typeof entry[1] === 'boolean' ? v === 'on' : parseInt(v || '-1'),
        }
      })
    )
  }
}
