import { map } from 'rxjs'
import * as fromRoot from '../+redux'
import * as fromProfile from './+redux'
import * as fromToolbar from '../toolbar/+redux'
import { User } from '../shared/models/User.model'

export class ProfileFacade {
  static user$ = fromRoot.state$.pipe(
    map((state) => fromRoot.selectUser(state))
  )

  static submitLogin(username: string): void {
    fromRoot.store.dispatch(
      fromProfile.submitLoginAction({ username: username })
    )
  }
  static login(user: User): void {
    fromRoot.store.dispatch(fromProfile.loginSuccessAction({ user: user }))
  }
  static closeLoginDialog(): void {
    fromRoot.store.dispatch(fromToolbar.closeLoginDialogAction())
  }
  static register(username: string): void {
    fromRoot.store.dispatch(fromProfile.registerAction({ username: username }))
  }
  static closeRegisterDialog(): void {
    fromRoot.store.dispatch(fromToolbar.closeRegisterDialogAction())
  }
  static submitSettings(user: User): void {
    fromRoot.store.dispatch(fromProfile.submitSettingsAction(user))
  }
  static closeSettingsDialog(): void {
    fromRoot.store.dispatch(fromToolbar.closeSettingsDialogAction())
  }
}
