import { Observable, map } from 'rxjs'
import * as fromRoot from '../+redux'
import * as fromLayout from './+redux'
import { SerializedImageData } from '../image/models/SerializedImageData.model'

// Facade objects relay information to and from the store.
// All their elements are static.
// Facades are not necessary intermediates, but help tidy away
// the details of interactions between components and the store.
export class LayoutFacade {
  // Observables encode slices of state as streams of data.
  static optionsVisible$ = fromRoot.state$.pipe(
    map((state) => fromRoot.selectOptionsVisible(state))
  )
  static optionsEnabled$ = fromRoot.state$.pipe(
    map(
      (state) =>
        fromRoot.selectImageLoaded(state) && fromRoot.selectInactive(state)
    )
  )
  static optionsButtonsEnabled$ = fromRoot.state$.pipe(
    map((state) => fromRoot.selectInactive(state))
  )
  static imageData$ = fromRoot.state$.pipe(
    map((state) => fromRoot.selectImageData(state))
  )

  // Dispatch functions initiate changes in State.
  static showOptions(): void {
    fromRoot.store.dispatch(fromLayout.showOptionsAction())
  }
  static hideOptions(): void {
    fromRoot.store.dispatch(fromLayout.hideOptionsAction())
  }
}
