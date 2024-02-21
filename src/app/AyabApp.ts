import { LitElement, html } from 'lit'
import { customElement, queryAsync, state } from 'lit/decorators.js'
import { Subscription, firstValueFrom } from 'rxjs'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
//import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js'
import { appStyle } from '../+styles/app.style'
import { buttonStyle } from '../+styles/button.style'
import '../toolbar/ToolBar'
import '../options/OptionsPanel'
import { OptionsPanel } from '../options/OptionsPanel'
import { ImageHelper } from '../image/helpers/image.helper'
import { SerializedImageData } from '../image/models/SerializedImageData.model'
import { ImageFacade } from '../image/+facade'
import { LayoutFacade } from './+facade'
import { Scale } from '../image/models/Scale.model'

//setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.1/cdn/')
setBasePath('../node_modules/@shoelace-style/shoelace/dist')

@customElement('ayab-app')
export class AyabApp extends LitElement {
  static override styles = [appStyle, buttonStyle]

  @state() protected _optionsVisible: boolean = false
  @state() protected _optionsButtonsDisabled: boolean = false
  @state() protected _scale: number = 1

  @queryAsync('canvas') protected _canvas: Promise<HTMLCanvasElement>
  @queryAsync('options-panel') protected _optionsPanel: Promise<OptionsPanel>

  private _optionsVisibleSubscription: Subscription
  private _optionsEnabledSubscription: Subscription
  private _optionsButtonsEnabledSubscription: Subscription
  private _imageDataSubscription: Subscription

  // Subscribe to changes in state

  override connectedCallback(): void {
    super.connectedCallback()
    this._optionsVisibleSubscription = LayoutFacade.optionsVisible$.subscribe(
      (visible) => this._onOptionsVisibleChange(visible)
    )
    this._optionsEnabledSubscription = LayoutFacade.optionsEnabled$.subscribe(
      (enabled) => this._onOptionsEnabledChange(enabled)
    )
    this._optionsButtonsEnabledSubscription =
      LayoutFacade.optionsButtonsEnabled$.subscribe((enabled) =>
        this._onOptionsButtonsEnabledChange(enabled)
      )
    this._imageDataSubscription = LayoutFacade.imageData$.subscribe((data) =>
      this._onImageDataChange(data)
    )
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._optionsVisibleSubscription.unsubscribe()
    this._optionsEnabledSubscription.unsubscribe()
    this._optionsButtonsEnabledSubscription.unsubscribe()
    this._imageDataSubscription.unsubscribe()
  }

  // Synchronize element to changes in state

  private _onOptionsVisibleChange(visible: boolean): void {
    this._optionsVisible = visible
  }

  private _onOptionsEnabledChange(enabled: boolean): void {
    this._optionsPanel.then((options) => {
      options.disabled = !enabled
    })
  }

  private _onOptionsButtonsEnabledChange(enabled: boolean): void {
    this._optionsButtonsDisabled = !enabled
  }

  private _onImageDataChange(data: SerializedImageData | null): void {
    firstValueFrom(ImageFacade.scene$).then((scene) =>
      this._canvas.then((canvas) =>
        ImageHelper.draw(canvas, data, new Scale(this._scale), scene)
      )
    )
  }

  // Input actions

  private _showOptions(): void {
    if (this._optionsVisible) return
    LayoutFacade.showOptions()
  }

  private _hideOptions(): void {
    if (!this._optionsVisible) return
    LayoutFacade.hideOptions()
  }

  private _onMouseWheel(event: WheelEvent) {
    event.preventDefault()
    let zoom = this._scale
    zoom += event.deltaY * -0.05
    zoom = Math.min(Math.max(1, Math.floor(zoom * 4) / 4), ImageHelper.MAX_ZOOM)
    if (this._scale !== zoom) {
      this._scale = zoom
      ImageFacade.zoomImage({ x: zoom, y: zoom })
    }
  }

  // Render

  private _optionsShown() {
    return html`
      <div class="top">
        <sl-button
          id="hideOptionsButton"
          title="Hide options"
          class="solid minifab shown"
          size="small"
          @click=${this._hideOptions}
          ?disabled=${this._optionsButtonsDisabled}
          circle
        >
          <sl-icon name="chevron-right"></sl-icon>
        </sl-button>
      </div>
    `
  }

  private _optionsHidden() {
    return html`
      <sl-button
        id="showOptionsButton"
        title="Show options"
        class="solid minifab hidden"
        size="small"
        @click=${this._showOptions}
        ?disabled=${this._optionsButtonsDisabled}
        circle
      >
        <sl-icon name="chevron-left"></sl-icon>
      </sl-button>
    `
  }

  override render() {
    return html`
      <div class="container">
        <tool-bar></tool-bar>
        <div class="grid">
          <div class="canvas">
            <canvas
              id="canvas"
              @wheel=${this._onMouseWheel}
            ></canvas>
          </div>
          <div>
            ${this._optionsVisible ? this._optionsShown() : ''}
            <div class="options ${this._optionsVisible ? 'shown' : 'hidden'}">
              ${this._optionsVisible ? '' : this._optionsHidden()}
              <div ?hidden=${!this._optionsVisible}>
                <options-panel disabled></options-panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
