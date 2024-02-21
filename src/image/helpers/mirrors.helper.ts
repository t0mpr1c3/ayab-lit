import { SettingsHelper } from '../../shared/helpers/settings.helper'
import { Mirrors } from '../models/Mirrors.model'

export class MirrorsHelper {
  static formSettings(f: FormData): Mirrors {
    return SettingsHelper.reduce(
      Object.entries(new Mirrors()).map((entry) => {
        let k = entry[0]
        let v: any = f.get(k)
        return {
          key: k,
          value: v === 'on',
        }
      })
    )
  }
}
