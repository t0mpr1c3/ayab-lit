import { createSlice } from '@reduxjs/toolkit'
import { User } from '../shared/models/User.model'

export interface State {
  loginName: string
  user: User | null
}

export const initialState: State = {
  loginName: '',
  user: null,
}

export const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    submitLoginAction: (state, action) => ({
      ...state,
      loginName: action.payload.username,
      user: null,
    }),

    loginSuccessAction: (state, action) => ({
      ...state,
      loginName: '',
      user: action.payload.user,
    }),

    logoutAction: (state) => ({
      ...state,
      user: null,
    }),
    /*
    registerAction: (state: State, action) => ({
      ...state,
      usernames: [ ...state.usernames, action.payload.username ],
    } as State),
*/
    registerAction: (state, _) => ({
      ...state,
      loginName: '',
    }),

    submitSettingsAction: (state, action) => ({
      ...state,
      user: !state.user
        ? null
        : { name: state.user.name, settings: action.payload.settings },
    }),
  },
})
export const {
  submitLoginAction,
  loginSuccessAction,
  logoutAction,
  registerAction,
  submitSettingsAction,
} = slice.actions
export const key = slice.name
