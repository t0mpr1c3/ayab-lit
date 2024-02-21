import { SettingsHelper } from '../../shared/helpers/settings.helper'
import { Mirrors } from '../models/Mirrors.model'

export class MirrorsHelper {
  static formSettings(formData: FormData): Mirrors {
    let m = new Mirrors()
    let f = SettingsHelper.reduce(
      Object.entries(m).map((entry) => {
        let k = entry[0]
        let v: any = formData.get(k)
        return {
          key: k,
          value: v === 'on',
        }
      })
    )
    return {
      ...m,
      ...f,
    }
  }
}
