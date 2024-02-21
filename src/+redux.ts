import { Action, Tuple, configureStore } from '@reduxjs/toolkit'
import { Epic, combineEpics, createEpicMiddleware } from 'redux-observable'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' /* defaults to localStorage for web */
import { from } from 'rxjs'
import * as fromLayout from './app/+redux'
import * as fromImage from './image/+redux'
import * as fromOptions from './options/+redux'
import * as fromProfile from './profile/+redux'
import * as fromToolbar from './toolbar/+redux'
import * as imageFx from './image/+effects'
import * as profileFx from './profile/+effects'
import * as toolbarFx from './toolbar/+effects'
import { defaultSettings } from './shared/models/Settings.model'
import { Machine, MachineEnum } from './shared/models/MachineEnum.model'

//import { localStorageService } from './+services/localStorage.service'

/**
 * The AYAB app uses Redux to organize data flow: https://redux.js.org/
 */

/**
 * The root State combines slices of immutable State from modules.
 */
export interface State {
  [fromLayout.key]: fromLayout.State
  [fromImage.key]: fromImage.State
  [fromOptions.key]: fromOptions.State
  [fromProfile.key]: fromProfile.State
  [fromToolbar.key]: fromToolbar.State
}

export const initialState: State = {
  [fromLayout.key]: fromLayout.initialState,
  [fromImage.key]: fromImage.initialState,
  [fromOptions.key]: fromOptions.initialState,
  [fromProfile.key]: fromProfile.initialState,
  [fromToolbar.key]: fromToolbar.initialState,
}

/**
 * Reducer functions are pure functions that map Actions onto changes in state.
 * The root reducer assembles the root state by applying reducing functions to each slice of state.
 */
export default function reducer(state: State = initialState, action: any) {
  return {
    [fromLayout.key]: fromLayout.slice.reducer(state[fromLayout.key], action),
    [fromImage.key]: fromImage.slice.reducer(state[fromImage.key], action),
    [fromOptions.key]: fromOptions.slice.reducer(
      state[fromOptions.key],
      action
    ),
    [fromProfile.key]: fromProfile.slice.reducer(
      state[fromProfile.key],
      action
    ),
    [fromToolbar.key]: fromToolbar.slice.reducer(
      state[fromToolbar.key],
      action
    ),
  } as State
}

/**
 * Persist state by saving to local storage
 */
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

/**
 * Components synchronize the DOM to changes in state.
 * Epic middleware allows side effects to be initiated by event handlers observing a stream of Actions.
 * This helps keep components pure, which makes them easier to test.
 * For more information on Epics, read 'redux-observable' docs & the comment in './toolbar/effects.ts'
 */
export const epic = combineEpics(
  imageFx.imageLoadedEpic as Epic<Action, Action, void, any>,
  //imageFx.imageChangedEpic,
  profileFx.loginSubmittedEpic as Epic<Action, Action, void, any>,
  profileFx.loginSucceededEpic,
  profileFx.logoutEpic,
  profileFx.registerEpic,
  profileFx.settingsEpic,
  toolbarFx.knittingStartedEpic,
  toolbarFx.knittingStoppedEpic
)
const epicMiddleware = createEpicMiddleware()

/**
 * The Store is the global repository of state data.
 */
export const store = configureStore({
  reducer: persistedReducer,
  //reducer: reducer,
  middleware: () => new Tuple(epicMiddleware),
})

/**
 * `persistStore` is the function that persists and rehydrates the state.
 */
export const persistor = persistStore(store)

epicMiddleware.run(epic as Epic<unknown, unknown, void, any>)

/**
 * state$ = Observable stream of data that outputs changes in State.
 */
export const state$ = from(store)

/**
 * Selector functions extract slices of State from the root State.
 */
export const selectLayout = (state: State) => state[fromLayout.key]
export const selectOptionsVisible = (state: State) =>
  selectLayout(state).optionsVisible

export const selectToolbar = (state: State) => state[fromToolbar.key]
export const selectLoginDialogOpened = (state: State) =>
  selectToolbar(state).loginDialogOpened
export const selectRegisterName = (state: State) =>
  selectToolbar(state).registerName
export const selectSettingsDialogOpened = (state: State) =>
  selectToolbar(state).settingsDialogOpened
export const selectTestDialogOpened = (state: State) =>
  selectToolbar(state).testDialogOpened
export const selectFirmwareDialogOpened = (state: State) =>
  selectToolbar(state).firmwareDialogOpened
export const selectAboutDialogOpened = (state: State) =>
  selectToolbar(state).aboutDialogOpened
export const selectImageStretchDialogOpened = (state: State) =>
  selectToolbar(state).imageStretchDialogOpened
export const selectImageRepeatDialogOpened = (state: State) =>
  selectToolbar(state).imageRepeatDialogOpened
export const selectImageReflectDialogOpened = (state: State) =>
  selectToolbar(state).imageReflectDialogOpened
export const selectKnitting = (state: State) => selectToolbar(state).knitting
export const selectInactive = (state: State) => {
  let toolbarState = selectToolbar(state)
  return (
    !toolbarState.loginDialogOpened &&
    !toolbarState.registerName &&
    !toolbarState.settingsDialogOpened &&
    !toolbarState.testDialogOpened &&
    !toolbarState.firmwareDialogOpened &&
    !toolbarState.aboutDialogOpened &&
    !toolbarState.imageStretchDialogOpened &&
    !toolbarState.imageRepeatDialogOpened &&
    !toolbarState.imageReflectDialogOpened &&
    !toolbarState.knitting
  )
}

export const selectProfile = (state: State) => state[fromProfile.key]
export const selectLoginName = (state: State) => selectProfile(state).loginName
export const selectUser = (state: State) => selectProfile(state).user
export const selectLoggedIn = (state: State) => !!selectProfile(state).user
export const selectUsername = (state: State) => {
  let user = selectUser(state)
  return !user ? '' : user.name
}
export const selectSettings = (state: State) => {
  let user = selectUser(state)
  return !user ? defaultSettings : user.settings
}
export const selectMachine = (state: State) => {
  let settings = selectSettings(state) as any
  return settings.machine as MachineEnum
}
export const selectMachineWidth = (state: State) =>
  Machine.needles(selectMachine(state))

export const selectImage = (state: State) => state[fromImage.key]
export const selectImageData = (state: State) => selectImage(state).data
export const selectImageWidth = (state: State) => selectImage(state).data?.width
export const selectImageHeight = (state: State) =>
  selectImage(state).data?.height
export const selectImageLoaded = (state: State) => !!selectImage(state).data
export const selectImageScale = (state: State) => selectImage(state).scale
export const selectImageXScale = (state: State) => selectImage(state).scale.x
export const selectImageYScale = (state: State) => selectImage(state).scale.y
/*
export const selectSceneCreated = (state: State) =>
  selectImage(state).sceneCreated
*/

export const selectOptions = (state: State) => state[fromOptions.key]
export const selectKnittingModeOption = (state: State) =>
  selectOptions(state).mode
export const selectKnitSideOption = (state: State) =>
  selectOptions(state).knitSide

/**
 * Scene selector
 */
export const selectScene = (state: State) => {
  let options = selectOptions(state)
  return {
    startRow: options.startRow,
    startColor: options.startColor,
    startNeedle: options.startNeedle,
    stopColor: options.stopColor,
    stopNeedle: options.stopNeedle,
    alignment: options.alignment,
    knitSide: options.knitSide,
    width: selectMachineWidth(state),
  }
}
