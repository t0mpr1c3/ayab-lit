import { TransformsHelper } from './helpers/transforms.helper'
import { createSlice } from '@reduxjs/toolkit'
import { Scale } from './models/Scale.model'
import { SerializedImageData } from './models/SerializedImageData.model'

export interface State {
  data: SerializedImageData | null
  scale: Scale
  /* sceneCreated: boolean */
}

export const initialState: State = {
  data: null,
  scale: { x: 1, y: 1 },
  /* sceneCreated: false, */
}

export const slice = createSlice({
  name: 'image',
  initialState: initialState,
  reducers: {
    /*
    createSceneAction: (state: State) =>
      ({
        ...state,
        sceneCreated: true,
      }) as State,
*/
    imageLoadedAction: (state: State, action) =>
      ({
        ...state,
        data: action.payload.data,
        //scale: { x: 1, y: 1 },
      }) as State,

    zoomImageAction: (state: State, action) =>
      ({
        ...state,
        scale: action.payload.scale,
      }) as State,

    invertImageAction: (state: State) =>
      ({
        ...state,
        data: TransformsHelper.transform(
          state.data!,
          TransformsHelper.invertImage
        ),
      }) as State,

    stretchImageAction: (state: State, action) =>
      ({
        ...state,
        data: TransformsHelper.transform(
          state.data!,
          TransformsHelper.stretchImage(action.payload.scale)
        ),
      }) as State,

    repeatImageAction: (state: State, action) =>
      ({
        data: TransformsHelper.transform(
          state.data!,
          TransformsHelper.repeatImage(action.payload.scale)
        ),
      }) as State,

    reflectImageAction: (state: State, action) =>
      ({
        data: TransformsHelper.transform(
          state.data!,
          TransformsHelper.reflectImage(action.payload.mirrors)
        ),
      }) as State,

    hFlipImageAction: (state: State) =>
      ({
        ...state,
        data: TransformsHelper.transform(
          state.data!,
          TransformsHelper.hFlipImage
        ),
      }) as State,

    vFlipImageAction: (state: State) =>
      ({
        ...state,
        data: TransformsHelper.transform(
          state.data!,
          TransformsHelper.vFlipImage
        ),
      }) as State,

    rotateImageLeftAction: (state: State) =>
      ({
        ...state,
        data: TransformsHelper.transform(
          state.data!,
          TransformsHelper.rotateImageLeft
        ),
      }) as State,

    rotateImageRightAction: (state: State) =>
      ({
        ...state,
        data: TransformsHelper.transform(
          state.data!,
          TransformsHelper.rotateImageRight
        ),
      }) as State,
  },
})
export const {
  /* createSceneAction, */
  imageLoadedAction,
  zoomImageAction,
  invertImageAction,
  stretchImageAction,
  repeatImageAction,
  reflectImageAction,
  hFlipImageAction,
  vFlipImageAction,
  rotateImageLeftAction,
  rotateImageRightAction,
} = slice.actions
export const key = slice.name
