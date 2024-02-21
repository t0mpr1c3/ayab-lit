import { createSlice } from '@reduxjs/toolkit'

export interface State {
  loginDialogOpened: boolean
  registerName: string
  settingsDialogOpened: boolean
  testDialogOpened: boolean
  firmwareDialogOpened: boolean
  aboutDialogOpened: boolean
  imageStretchDialogOpened: boolean
  imageRepeatDialogOpened: boolean
  imageReflectDialogOpened: boolean
  knitting: boolean
}

export const initialState: State = {
  loginDialogOpened: false,
  registerName: '',
  settingsDialogOpened: false,
  testDialogOpened: false,
  firmwareDialogOpened: false,
  aboutDialogOpened: false,
  imageStretchDialogOpened: false,
  imageRepeatDialogOpened: false,
  imageReflectDialogOpened: false,
  knitting: false,
}

export const slice = createSlice({
  name: 'toolbar',
  initialState: initialState,
  reducers: {
    openLoginDialogAction: (state: State) =>
      ({
        ...state,
        loginDialogOpened: true,
      }) as State,

    closeLoginDialogAction: (state: State) =>
      ({
        ...state,
        loginDialogOpened: false,
      }) as State,

    openRegisterDialogAction: (state: State, action) =>
      ({
        ...state,
        registerName: action.payload.username,
      }) as State,

    closeRegisterDialogAction: (state: State) =>
      ({
        ...state,
        registerName: '',
      }) as State,

    openSettingsDialogAction: (state: State) =>
      ({
        ...state,
        settingsDialogOpened: true,
      }) as State,

    closeSettingsDialogAction: (state: State) =>
      ({
        ...state,
        settingsDialogOpened: false,
      }) as State,

    openTestDialogAction: (state: State) =>
      ({
        ...state,
        testDialogOpened: true,
      }) as State,

    closeTestDialogAction: (state: State) =>
      ({
        ...state,
        testDialogOpened: false,
      }) as State,

    openFirmwareDialogAction: (state: State) =>
      ({
        ...state,
        firmwareDialogOpened: true,
      }) as State,

    closeFirmwareDialogAction: (state: State) =>
      ({
        ...state,
        firmwareDialogOpened: false,
      }) as State,

    openAboutDialogAction: (state: State) =>
      ({
        ...state,
        aboutDialogOpened: true,
      }) as State,

    closeAboutDialogAction: (state: State) =>
      ({
        ...state,
        aboutDialogOpened: false,
      }) as State,

    openImageStretchDialogAction: (state: State) =>
      ({
        ...state,
        imageStretchDialogOpened: true,
      }) as State,

    closeImageStretchDialogAction: (state: State) =>
      ({
        ...state,
        imageStretchDialogOpened: false,
      }) as State,

    openImageRepeatDialogAction: (state: State) =>
      ({
        ...state,
        imageRepeatDialogOpened: true,
      }) as State,

    closeImageRepeatDialogAction: (state: State) =>
      ({
        ...state,
        imageRepeatDialogOpened: false,
      }) as State,

    openImageReflectDialogAction: (state: State) =>
      ({
        ...state,
        imageReflectDialogOpened: true,
      }) as State,

    closeImageReflectDialogAction: (state: State) =>
      ({
        ...state,
        imageReflectDialogOpened: false,
      }) as State,
    startKnittingAction: (state: State) =>
      ({
        ...state,
        knitting: true,
      }) as State,

    stopKnittingAction: (state: State) =>
      ({
        ...state,
        knitting: false,
      }) as State,
  },
})
export const {
  openLoginDialogAction,
  closeLoginDialogAction,
  openRegisterDialogAction,
  closeRegisterDialogAction,
  openSettingsDialogAction,
  closeSettingsDialogAction,
  openTestDialogAction,
  closeTestDialogAction,
  openFirmwareDialogAction,
  closeFirmwareDialogAction,
  openAboutDialogAction,
  closeAboutDialogAction,
  openImageStretchDialogAction,
  closeImageStretchDialogAction,
  openImageRepeatDialogAction,
  closeImageRepeatDialogAction,
  openImageReflectDialogAction,
  closeImageReflectDialogAction,
  startKnittingAction,
  stopKnittingAction,
} = slice.actions
export const key = slice.name
