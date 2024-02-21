import { Scale } from '../models/Scale.model'
import { Mirrors } from '../models/Mirrors.model'
import { SerializedImageData } from '../models/SerializedImageData.model'

export interface ImageCache {
  data: ImageData | null
  stale: boolean
}

// All methods in this class are pure
// FIXME crop if result exceeds machine width
export class TransformsHelper {
  static MAX_WIDTH = 200 // or machine width, whichever is lower
  static MAX_HEIGHT = 500

  // FIXME crop if result exceeds allowable dimensions
  static flatten3d(
    arr: Uint8ClampedArray[][],
    width: number,
    height: number
  ): ImageData {
    let _width = Math.min(width, TransformsHelper.MAX_WIDTH)
    let _height = Math.min(height, TransformsHelper.MAX_HEIGHT)
    let data = new Uint8ClampedArray(_width * _height * 4)
    for (let y = 0, j = 0; y < _height; y += 1, j += _width * 4) {
      for (let x = 0, i = 0; x < _width; x += 1, i += 4) {
        data.set(arr[y]![x]!, i + j)
      }
    }
    return new ImageData(data, width, height)
  }

  static hFlipImage = (img: ImageData): ImageData => {
    // Convert to 3D array, reversing each row
    let data = Array<Array<Uint8ClampedArray>>(img.height)
    for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
      let row = Array<Uint8ClampedArray>(img.width)
      for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
        row[img.width - x - 1] = img.data.slice(i + j, i + j + 4)
      }
      data[y] = row
    }
    // Return flattened data
    return this.flatten3d(data, img.width, img.height)
  }

  static invertImage = (img: ImageData): ImageData => {
    let data: Uint8ClampedArray = img.data
    for (let i = 0; i < data.length; i += 4) {
      data[i + 0] = 0xff - data[i + 0]!
      data[i + 1] = 0xff - data[i + 1]!
      data[i + 2] = 0xff - data[i + 2]!
    }
    return new ImageData(data, img.width, img.height)
  }

  static rotateImageLeft = (img: ImageData): ImageData => {
    // Convert to 3D array, transposing rows and columns, reversing rows
    let data = Array<Array<Uint8ClampedArray>>(img.width)
    for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
      let column = Array<Uint8ClampedArray>(img.width)
      for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
        column[y] = img.data.slice(i + j, i + j + 4)
      }
      data[img.width - x - 1] = column
    }
    // Return flattened data
    return this.flatten3d(data, img.height, img.width)
  }

  static rotateImageRight = (img: ImageData): ImageData => {
    // Convert to 3D array, transposing rows and columns, reversing columns
    let data = Array<Array<Uint8ClampedArray>>(img.width)
    for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
      let column = Array<Uint8ClampedArray>(img.width)
      for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
        column[img.height - y - 1] = img.data.slice(i + j, i + j + 4)
      }
      data[x] = column
    }
    // Return flattened data
    return this.flatten3d(data, img.height, img.width)
  }

  static reflectImage(mirrors: Mirrors) {
    return (img: ImageData): ImageData => {
      // Convert to 3D array, multiplying each row and column
      let xscale = +mirrors.left + +mirrors.right + 1
      let yscale = +mirrors.top + +mirrors.bottom + 1
      let u = mirrors.left ? img.width : 0
      let v = mirrors.top ? img.height : 0
      let data = Array<Array<Uint8ClampedArray>>(img.height * yscale)
      for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
        let row = Array<Uint8ClampedArray>(xscale * img.width * 4)
        for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
          let slice = img.data.slice(i + j, i + j + 4)
          if (mirrors.left) {
            row[img.width - x - 1] = slice
          }
          row[x + u] = slice
          if (mirrors.right) {
            row[2 * img.width - x + u - 1] = slice
          }
        }
        if (mirrors.top) {
          data[img.height - y - 1] = row
        }
        data[y + v] = row
        if (mirrors.bottom) {
          data[2 * img.height - y + v - 1] = row
        }
      }
      // Return flattened data
      return this.flatten3d(data, img.width * xscale, img.height * yscale)
    }
  }

  static repeatImage(scale: Scale) {
    return (img: ImageData): ImageData => {
      // Convert to 3D array, multiplying each row and column
      let data = Array<Array<Uint8ClampedArray>>(img.height * scale.y)
      for (let v = 0; v < scale.y; v += 1) {
        for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
          let row = Array<Uint8ClampedArray>(scale.x * img.width * 4)
          for (let u = 0; u < scale.x; u += 1) {
            for (let x = 0, i = 0; x < img.width; x += 1, i += 4) {
              row[x + u * img.width] = img.data.slice(i + j, i + j + 4)
            }
          }
          data[y + v * img.height] = row
        }
      }
      // Return flattened data
      return this.flatten3d(data, img.width * scale.x, img.height * scale.y)
    }
  }

  static stretchImage(scale: Scale) {
    return (img: ImageData): ImageData => {
      // Convert to 3D array, multiplying each row and column
      let data = Array<Array<Uint8ClampedArray>>(img.height * scale.y)
      for (
        let y = 0, j = 0;
        y < img.height * scale.y;
        y += scale.y, j += img.width * 4
      ) {
        let row = Array<Uint8ClampedArray>(img.width * scale.x)
        for (let x = 0, i = 0; x < img.width * scale.x; x += scale.x, i += 4) {
          for (let k = 0; k < scale.x; k += 1) {
            row[x + k] = img.data.slice(i + j, i + j + 4)
          }
        }
        for (let k = 0; k < scale.y; k += 1) {
          data[y + k] = row
        }
      }
      // Return flattened data
      return this.flatten3d(data, img.width * scale.x, img.height * scale.y)
    }
  }

  static vFlipImage = (img: ImageData): ImageData => {
    // Convert to 2D array, reversing order of rows
    let data = Array<Uint8ClampedArray>(img.height)
    for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
      data[img.height - y - 1] = img.data.slice(j, j + img.width * 4)
    }
    // Return flattened data
    let res = new Uint8ClampedArray(img.data.length)
    for (let y = 0, j = 0; y < img.height; y += 1, j += img.width * 4) {
      res.set(data[y]!, j)
    }
    return new ImageData(res, img.width, img.height)
  }

  /** Cache for ImageData object on the canvas that corresponds to SerializedImageData object in the State.
    * Usage:
    - whenever the ImageData is serialized, save it to the cache.
    - whenever the ImageData is modified, mark the cache as stale.
    - whenever the serialized ImageData is deserialized, use the cached data unless stale.
    */
  static cache: ImageCache = {
    data: null,
    stale: true,
  }

  static cacheImageData(data: ImageData | null): void {
    TransformsHelper.cache = { data: data, stale: false }
  }

  static serialize(image: ImageData | null): SerializedImageData | null {
    if (image === null) {
      return null
    }
    TransformsHelper.cacheImageData(image)
    return {
      data: Array.from(image.data),
      width: image.width,
      height: image.height,
    }
  }

  static setCacheStale(): void {
    TransformsHelper.cache.stale = true
  }

  static transform(
    data: SerializedImageData | null,
    fn: (i: ImageData) => ImageData
  ): SerializedImageData | null {
    if (data === null) {
      return null
    }
    let image = fn(TransformsHelper.deserialize(data)!)
    TransformsHelper.setCacheStale()
    return TransformsHelper.serialize(image)
  }

  static deserialize(image: SerializedImageData | null): ImageData | null {
    if (!TransformsHelper.cache.stale) {
      return TransformsHelper.cache.data
    }
    if (image === null) {
      return null
    }
    const view = new Uint8ClampedArray(image.data)
    return new ImageData(view, image.width, image.height)
  }
}
