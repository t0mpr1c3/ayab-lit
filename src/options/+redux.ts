import { createSlice } from '@reduxjs/toolkit'
import { ModeEnum } from '../shared/models/ModeEnum.model'
import { ColorEnum } from '../shared/models/ColorEnum.model'
import { AlignmentEnum } from '../shared/models/AlignmentEnum.model'

export interface State {
  valid: boolean
  mode: ModeEnum
  colors: number
  startRow: number
  infRepeat: boolean
  startNeedle: number
  startColor: ColorEnum
  stopNeedle: number
  stopColor: ColorEnum
  alignment: AlignmentEnum
  knitSide: boolean
}

export const initialState: State = {
  valid: true,
  mode: ModeEnum.Single_Bed,
  colors: 2,
  startRow: 1,
  infRepeat: false,
  startNeedle: 1,
  startColor: ColorEnum.orange,
  stopNeedle: 1,
  stopColor: ColorEnum.green,
  alignment: AlignmentEnum.Center,
  knitSide: false,
}

export const slice = createSlice({
  name: 'options',
  initialState: initialState,
  reducers: {
    setOptionsValidityAction: (state: State, action) =>
      ({
        ...state,
        valid: action.payload.valid,
      }) as State,

    setKnittingModeOptionAction: (state: State, action) =>
      ({
        ...state,
        mode: action.payload.mode,
      }) as State,

    setColorsOptionAction: (state: State, action) =>
      ({
        ...state,
        colors: action.payload.colors,
      }) as State,

    setStartRowOptionAction: (state: State, action) =>
      ({
        ...state,
        startRow: action.payload.startRow,
      }) as State,

    setInfiniteRepeatOptionAction: (state: State, action) =>
      ({
        ...state,
        infRepeat: action.payload.infRepeat,
      }) as State,

    setStartNeedleOptionAction: (state: State, action) =>
      ({
        ...state,
        startNeedle: action.payload.startNeedle,
      }) as State,

    setStartColorOptionAction: (state: State, action) =>
      ({
        ...state,
        startColor: action.payload.startColor,
      }) as State,

    setStopNeedleOptionAction: (state: State, action) =>
      ({
        ...state,
        stopNeedle: action.payload.stopNeedle,
      }) as State,

    setStopColorOptionAction: (state: State, action) =>
      ({
        ...state,
        stopColor: action.payload.stopColor,
      }) as State,

    setAlignmentOptionAction: (state: State, action) =>
      ({
        ...state,
        alignment: action.payload.alignment,
      }) as State,

    setKnitSideOptionAction: (state: State, action) =>
      ({
        ...state,
        knitSide: action.payload.knitSide,
      }) as State,
  },
})
export const {
  setOptionsValidityAction,
  setKnittingModeOptionAction,
  setColorsOptionAction,
  setStartRowOptionAction,
  setInfiniteRepeatOptionAction,
  setStartNeedleOptionAction,
  setStartColorOptionAction,
  setStopNeedleOptionAction,
  setStopColorOptionAction,
  setAlignmentOptionAction,
  setKnitSideOptionAction,
} = slice.actions
export const key = slice.name
