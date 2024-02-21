import { createSlice } from '@reduxjs/toolkit'

/**
 * State is immutable.
 */
export interface State {
  optionsVisible: boolean
}

export const initialState: State = {
  optionsVisible: false,
}

/**
 * Everything a user does that changes the State should be described by an Action.
 * When an Action is received, the Store emits a new State object.
 */
export const slice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    showOptionsAction: (state: State) =>
      ({
        ...state,
        optionsVisible: true,
      }) as State,

    hideOptionsAction: (state: State) =>
      ({
        ...state,
        optionsVisible: false,
      }) as State,
  },
})
export const { showOptionsAction, hideOptionsAction } = slice.actions
export const key = slice.name
