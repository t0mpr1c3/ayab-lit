import { Observable, tap } from 'rxjs'
import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import * as fromToolbar from './+redux'

export const knittingStartedEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fromToolbar.startKnittingAction.type),
    tap(() => alert('side effect: knitting started')), // FIXME placeholder
    ofType('') // side effects only
  )

export const knittingStoppedEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fromToolbar.stopKnittingAction.type),
    //tap(() => alert('side effect: knitting stopped')), // FIXME placeholder
    ofType('') // side effects only
  )
