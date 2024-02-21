import { Observable, map } from 'rxjs'
import * as fromRoot from '../+redux'
import * as fromImage from '../image/+redux'
import * as fromProfile from '../profile/+redux'
import * as fromToolbar from './+redux'
import { SerializedImageData } from '../image/models/SerializedImageData.model'

export class ToolbarFacade {
  static username$ = fromRoot.state$.pipe(
    map((state) => fromRoot.selectUsername(state))
  )
  static loginDialogOpened$ = fromRoot.state$.pipe(
    map((state) => fromRoot.selectLoginDialogOpened(state))
  )
  static registerName$ = fromRoot.state$.pipe(
    map((state) => fromRoot.selectRegisterName(state))
  )
  static settingsDialogOpened$ = fromRoot.state$.pipe(
    map((state) => fromRoot.selectSettingsDialogOpened(state))
  )
  static imageLoaded$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectImageLoaded(state))
  )
  static menuButtonsEnabled$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectInactive(state))
  )
  static knitButtonEnabled$: Observable<boolean> = fromRoot.state$.pipe(
    map(
      (state) =>
        fromRoot.selectImageLoaded(state) && fromRoot.selectInactive(state)
    )
  )
  static firmwareDialogOpened$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectFirmwareDialogOpened(state))
  )
  static testDialogOpened$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectTestDialogOpened(state))
  )
  static aboutDialogOpened$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectAboutDialogOpened(state))
  )
  static imageStretchDialogOpened$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectImageStretchDialogOpened(state))
  )
  static imageRepeatDialogOpened$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectImageRepeatDialogOpened(state))
  )
  static imageReflectDialogOpened$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectImageReflectDialogOpened(state))
  )
  static knitting$: Observable<boolean> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectKnitting(state))
  )

  static openLoginDialog(): void {
    fromRoot.store.dispatch(fromToolbar.openLoginDialogAction())
  }
  static openSettingsDialog(): void {
    fromRoot.store.dispatch(fromToolbar.openSettingsDialogAction())
  }
  static openFirmwareDialog(): void {
    fromRoot.store.dispatch(fromToolbar.openFirmwareDialogAction())
  }
  static closeFirmwareDialog(): void {
    fromRoot.store.dispatch(fromToolbar.closeFirmwareDialogAction())
  }
  static openTestDialog(): void {
    fromRoot.store.dispatch(fromToolbar.openTestDialogAction())
  }
  static closeTestDialog(): void {
    fromRoot.store.dispatch(fromToolbar.closeTestDialogAction())
  }
  static openAboutDialog(): void {
    fromRoot.store.dispatch(fromToolbar.openAboutDialogAction())
  }
  static closeAboutDialog(): void {
    fromRoot.store.dispatch(fromToolbar.closeAboutDialogAction())
  }
  static openImageStretchDialog(): void {
    fromRoot.store.dispatch(fromToolbar.openImageStretchDialogAction())
  }
  static closeImageStretchDialog(): void {
    fromRoot.store.dispatch(fromToolbar.closeImageStretchDialogAction())
  }
  static openImageRepeatDialog(): void {
    fromRoot.store.dispatch(fromToolbar.openImageRepeatDialogAction())
  }
  static closeImageRepeatDialog(): void {
    fromRoot.store.dispatch(fromToolbar.closeImageRepeatDialogAction())
  }
  static openImageReflectDialog(): void {
    fromRoot.store.dispatch(fromToolbar.openImageReflectDialogAction())
  }
  static closeImageReflectDialog(): void {
    fromRoot.store.dispatch(fromToolbar.closeImageReflectDialogAction())
  }
  static startKnitting(): void {
    fromRoot.store.dispatch(fromToolbar.startKnittingAction())
  }
  static stopKnitting(): void {
    fromRoot.store.dispatch(fromToolbar.stopKnittingAction())
  }
  static imageLoaded(data: SerializedImageData): void {
    fromRoot.store.dispatch(fromImage.imageLoadedAction({ data: data }))
  }
  static logout(): void {
    fromRoot.store.dispatch(fromProfile.logoutAction())
  }
}
