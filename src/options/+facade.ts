import { Observable, map } from 'rxjs'
import * as fromRoot from '../+redux'
import * as fromOptions from './+redux'
import { User } from '../shared/models/User.model'
import { AlignmentEnum } from '../shared/models/AlignmentEnum.model'
import { ColorEnum } from '../shared/models/ColorEnum.model'
import { ModeEnum } from '../shared/models/ModeEnum.model'

export class OptionsFacade {
  static user$: Observable<User | null> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectUser(state))
  )
  static options$: Observable<fromOptions.State> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectOptions(state))
  )
  static mode$: Observable<ModeEnum> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectKnittingModeOption(state))
  )
  static knitSide$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectKnitSideOption(state))
  )
  static imageHeight$: Observable<number | undefined> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectImageHeight(state))
  )

  static setKnittingModeOption(mode: ModeEnum): void {
    fromRoot.store.dispatch(
      fromOptions.setKnittingModeOptionAction({ mode: mode })
    )
  }
  static setColorsOption(colors: number): void {
    fromRoot.store.dispatch(
      fromOptions.setColorsOptionAction({ colors: colors })
    )
  }
  static setStartRowOption(startRow: number): void {
    fromRoot.store.dispatch(
      fromOptions.setStartRowOptionAction({ startRow: startRow })
    )
  }
  static setInfiniteRepeatOption(checked: boolean): void {
    fromRoot.store.dispatch(
      fromOptions.setInfiniteRepeatOptionAction({ infRepeat: checked })
    )
  }
  static setStartNeedleOption(needle: number): void {
    fromRoot.store.dispatch(
      fromOptions.setStartNeedleOptionAction({ startNeedle: needle })
    )
  }
  static setStartColorOption(color: ColorEnum): void {
    fromRoot.store.dispatch(
      fromOptions.setStartColorOptionAction({ startColor: color })
    )
  }
  static setStopNeedleOption(needle: number): void {
    fromRoot.store.dispatch(
      fromOptions.setStopNeedleOptionAction({ stopNeedle: needle })
    )
  }
  static setStopColorOption(color: ColorEnum): void {
    fromRoot.store.dispatch(
      fromOptions.setStopColorOptionAction({ stopColor: color })
    )
  }
  static setAlignmentOption(alignment: AlignmentEnum): void {
    fromRoot.store.dispatch(
      fromOptions.setAlignmentOptionAction({ alignment: alignment })
    )
  }
  static setKnitSideOption(checked: boolean): void {
    fromRoot.store.dispatch(
      fromOptions.setKnitSideOptionAction({ knitSide: checked })
    )
  }
}
