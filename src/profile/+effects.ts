import { Observable, of, switchMap, tap } from 'rxjs'
import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import * as fromProfile from './+redux'
import * as fromOptions from '../options/+redux'
import * as fromToolbar from '../toolbar/+redux'
import { LocalStorageService } from '../+services/localStorage.service'
import { User } from '../shared/models/User.model'
import { defaultSettings } from '../shared/models/Settings.model'
import { ActionType } from '../shared/models/ActionType.model'

/** On submission of login form: 
  ✓ Login dialog requests username input.
  ✓ Username is checked against names of known users.
  ✓ If the username is not recognised, user is prompted to register the new username.
  ✓ If username is recognized, saved user settings are uploaded from local storage.
  */
export const loginSubmittedEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fromProfile.submitLoginAction.type),
    switchMap((action: ActionType) => {
      const user = LocalStorageService.findUser(action.payload.username)
      return user !== null
        ? of(fromProfile.loginSuccessAction({ user: user }))
        : of(
            fromToolbar.openRegisterDialogAction({
              username: action.payload.username,
            })
          )
    })
  )

/** After successful login:
  ✓ Reset options form to user settings.
  */
export const loginSucceededEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fromProfile.loginSuccessAction.type),
    switchMap((action: ActionType) =>
      of(
        fromOptions.setKnittingModeOptionAction({
          mode: action.payload.user.settings.mode,
        }),
        fromOptions.setInfiniteRepeatOptionAction({
          infRepeat: action.payload.user.settings.infRepeat,
        }),
        fromOptions.setAlignmentOptionAction({
          alignment: action.payload.user.settings.alignment,
        }),
        fromOptions.setKnitSideOptionAction({
          knitSide: action.payload.user.settings.knitSide,
        })
      )
    )
  )

/** On logout:
  ✓ Reset saved user in local storage.
  ✓ Reset options form to default settings.
  */
export const logoutEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fromProfile.logoutAction.type),
    tap(() => {
      LocalStorageService.user = null
    }),
    switchMap(() =>
      of(
        fromOptions.setKnittingModeOptionAction({
          mode: (defaultSettings as any).mode,
        }),
        fromOptions.setInfiniteRepeatOptionAction({
          infRepeat: (defaultSettings as any).infRepeat,
        }),
        fromOptions.setAlignmentOptionAction({
          alignment: (defaultSettings as any).alignment,
        }),
        fromOptions.setKnitSideOptionAction({
          knitSide: (defaultSettings as any).knitSide,
        })
      )
    )
  )

/** When a new user name is registered:
  ✓ Create a new user using the default settings.
  ✓ Set the new user as the logged in user in local storage.
  */
export const registerEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fromProfile.registerAction.type),
    switchMap((action: ActionType) => {
      const user: User = {
        name: action.payload.username,
        settings: defaultSettings,
      }
      LocalStorageService.user = user
      return of(fromProfile.loginSuccessAction({ user: user }))
    })
  )

/** When new user settings are submitted:
  ✓ Change the settings in local storage.
  */
export const settingsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fromProfile.submitSettingsAction.type),
    tap((action: ActionType) => {
      console.log(`payload ${JSON.stringify(action.payload)}`)
      const user: User = {
        name: action.payload.name,
        settings: action.payload.settings,
      }
      LocalStorageService.user = user
    }),
    ofType('')
  )
