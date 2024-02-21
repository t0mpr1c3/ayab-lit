import { Observable, map } from 'rxjs'
import * as fromRoot from '../+redux'
import * as fromImage from './+redux'
import { User } from '../shared/models/User.model'
import { Scene } from './models/Scene.model'
import { Scale } from './models/Scale.model'
import { Mirrors } from './models/Mirrors.model'

export class ImageFacade {
  static user$: Observable<User | null> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectUser(state))
  )
  static scene$: Observable<Scene> = fromRoot.state$.pipe(
    map((state) => fromRoot.selectScene(state))
  )

  /*
  static createScene(): void {
    fromRoot.store.dispatch(fromImage.createSceneAction())
  }
  */
  static zoomImage(scale: Scale): void {
    fromRoot.store.dispatch(fromImage.zoomImageAction({ scale: scale }))
  }
  static invertImage(): void {
    fromRoot.store.dispatch(fromImage.invertImageAction())
  }
  static stretchImage(scale: Scale): void {
    fromRoot.store.dispatch(fromImage.stretchImageAction({ scale: scale }))
  }
  static repeatImage(scale: Scale): void {
    fromRoot.store.dispatch(fromImage.repeatImageAction({ scale: scale }))
  }
  static reflectImage(mirrors: Mirrors): void {
    fromRoot.store.dispatch(fromImage.reflectImageAction({ mirrors: mirrors }))
  }
  static hFlipImage(): void {
    fromRoot.store.dispatch(fromImage.hFlipImageAction())
  }
  static vFlipImage(): void {
    fromRoot.store.dispatch(fromImage.vFlipImageAction())
  }
  static rotateImageLeft(): void {
    fromRoot.store.dispatch(fromImage.rotateImageLeftAction())
  }
  static rotateImageRight(): void {
    fromRoot.store.dispatch(fromImage.rotateImageRightAction())
  }
}
