import { Observable, of, switchMap } from 'rxjs'
import { Action } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import * as fromImage from './+redux'
import * as fromLayout from '../app/+redux'
import * as fromOptions from '../options/+redux'
//import { MutationObserverHelper } from '../shared/helpers/mutation-observer.helper'
import { ColorEnum } from '../shared/models/ColorEnum.model'
import { ActionType } from '../shared/models/ActionType.model'

/**
 * An Epic is a function that takes as input a stream of actions,
 * and outputs another stream of actions to be dispatched to the Store.
 * (The data streams, called Observables, are implemented in the module `rxjs`.)
 * The input stream is filtered using `ofType` to actions of (a) specified type(s).
 * Asynchronous manipulations of the stream are applied sequentially in a `pipe` by function composition.
 * Side effects can be initiated by inserting a `tap` into the sequence:
 * e.g. `tap((action: Action) => console.log(action))`
 * If no Actions need to be dispatched, end the pipe with `ofType('')`
 */

/**
 * Update options when image loaded
 */
export const imageLoadedEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fromImage.imageLoadedAction.type),
    switchMap(
      (action: ActionType) =>
        action.payload.data &&
        of(
          fromOptions.setStartRowOptionAction({ startRow: 1 }),
          fromOptions.setStartNeedleOptionAction({
            startNeedle: Math.ceil(action.payload.data.width / 2),
          }),
          fromOptions.setStartColorOptionAction({
            startColor: ColorEnum.orange,
          }),
          fromOptions.setStopNeedleOptionAction({
            stopNeedle: Math.floor(action.payload.data.width / 2),
          }),
          fromOptions.setStopColorOptionAction({ stopColor: ColorEnum.green }),
          fromLayout.showOptionsAction()
        )
    )
  )

/**
 * Update scene after image loaded or transformed
export const imageChangedEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(
      fromImage.imageLoadedAction.type,
      fromImage.invertImageAction.type,
      fromImage.stretchImageAction.type,
      fromImage.repeatImageAction.type,
      fromImage.reflectImageAction.type,
      fromImage.hFlipImageAction.type,
      fromImage.vFlipImageAction.type,
      fromImage.rotateImageLeftAction.type,
      fromImage.rotateImageRightAction.type
    ),
    switchMap(() =>
      from(fromRoot.store).pipe(map((state) => fromRoot.selectScene(state)))
    ),
    tap((scene) => scene.data && SceneHelper.drawCanvas(scene)),
    ofType('')
  )
 */
