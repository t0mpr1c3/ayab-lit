import { AlignmentEnum } from '../../shared/models/AlignmentEnum.model'
import { Scale } from '../models/Scale.model'
import { Scene } from '../models/Scene.model'
import { SerializedImageData } from '../models/SerializedImageData.model'
import { TransformsHelper } from './transforms.helper'

// Impure methods to update canvas etc.
export class ImageHelper {
  static MAX_ZOOM = 8

  // Asynchronously check image file and return data.
  static processFile(imageFile?: File | null): Promise<ImageData | null> {
    if (!imageFile) {
      return Promise.resolve(null)
    }

    if (imageFile.type !== 'image/png') {
      // FIXME allow other formats (.stp &c)
      throw 'File is wrong format'
    }

    if (imageFile.size > 41000) {
      // sanity check: 200 * 500 * 4 = 40000
      throw 'Image file is too big'
    }

    // Return image data
    return ImageHelper.getData(imageFile)
      .then((data) => {
        if (data) {
          TransformsHelper.setCacheStale()
        }
        return data
      })
      .catch((error) => {
        throw error
      })
  }

  // Asynchronously obtain image data from file.
  static getData(imageFile: File): Promise<ImageData | null> {
    // Read image file
    const reader = new FileReader()
    reader.onload = function (e) {
      if (e.target) {
        img.src = (e.target.result || '') as string
        document.body.appendChild(img)
      }
    }
    reader.readAsDataURL(imageFile)

    // Set up new canvas
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return Promise.resolve(null)
    }

    // Create new HTMLImageElement
    const img = new Image()
    img.hidden = true

    // Get image data
    // FIXME crop image if it is too wide for the machine?
    return new Promise<ImageData>(function (resolve, _) {
      img.onload = () => {
        // Draw image
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Get ImageData from HTMLImageElement
        const data = ctx.getImageData(0, 0, img.width, img.height) || {
          data: [],
        }

        // Delete new HTML elements
        canvas.remove()
        img.remove()

        // Return promise of SerializedImageData
        resolve(data)
      }
    })
  }

  // Draw machine and image.
  static draw(
    canvas: HTMLCanvasElement,
    data: SerializedImageData | null,
    scale: Scale,
    scene: Scene
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }
    if (!data) {
      // Blank canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }
    const imageData = TransformsHelper.deserialize(data)!
    const flippedImageData = scene.knitSide
      ? TransformsHelper.hFlipImage(imageData)
      : imageData
    createImageBitmap(flippedImageData).then((bitmap) => {
      const sx = scale.x
      const sy = scale.y
      const mw = scene.width * sx
      const mh = 5 * sy
      const sr = scene.startRow * sy
      const startIndex =
        scene.startColor === 0
          ? scene.width / 2 - scene.startNeedle
          : scene.width / 2 + scene.startNeedle - 1
      const stopIndex =
        scene.stopColor === 0
          ? scene.width / 2 - scene.stopNeedle
          : scene.width / 2 + scene.stopNeedle - 1
      const ax = startIndex * sx
      const bx = stopIndex * sx
      const ix =
        sx *
        (scene.alignment === AlignmentEnum.Left
          ? startIndex + 1
          : scene.alignment === AlignmentEnum.Right
            ? stopIndex - imageData.width + 2
            : // scene.alignment === AlignmentEnum.Center
              Math.floor((startIndex + stopIndex - imageData.width + 3) / 2))
      const iw = imageData.width * sx
      const ih = imageData.height * sy
      canvas.width = mw + 2 * sx
      canvas.height = ih + mh
      ctx.imageSmoothingEnabled = false // Keep pixel perfect
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, mh)
      ctx.fillStyle = 'orange'
      ctx.fillRect(sx, sy, mw / 2, 3 * sy)
      ctx.fillStyle = 'green'
      ctx.fillRect(sx + mw / 2, sy, mw / 2, 3 * sy)
      ctx.drawImage(bitmap, ix, mh, iw, ih)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      ctx.fillRect(ix, mh, Math.max(0, ax - ix), ih + mh)
      ctx.fillRect(
        bx + 3 * sx,
        mh,
        Math.max(0, ix + iw - (bx + 3 * sx)),
        ih + mh
      )
      ctx.fillStyle = 'black'
      ctx.fillRect(ax, 0, sx, ih + mh)
      ctx.fillRect(bx + 2 * sx, 0, sx, ih + mh)
      ctx.fillRect(bx + 2 * sx, ih - sr + mh, canvas.width, sy)
      ctx.fillRect(0, ih - sr + mh, ax, sy)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      ctx.fillRect(ax + sx, ih - sr + mh + sy, bx - ax + sx, sr - sy)
    })
  }
}
