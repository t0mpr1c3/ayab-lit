import { LitElement, html } from 'lit'
import { customElement, queryAsync } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/alert/alert.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/popup/popup.js'
import SlPopup from '@shoelace-style/shoelace/dist/components/popup/popup.js'
import { Subscription } from 'rxjs'
import { ImageHelper } from '../image/helpers/image.helper'
import { TransformsHelper } from '../image/helpers/transforms.helper'
import { buttonStyle } from '../+styles/button.style'
import { dialogStyle } from '../+styles/dialog.style'
import { menuStyle } from '../+styles/menu.style'
import { toolbarStyle } from '../+styles/toolbar.style'
import { ToolbarFacade } from './+facade'
import './MyAyabMenu'
import './ImageMenu'
import './ToolsMenu'
import './HelpMenu'

@customElement('tool-bar')
export class ToolBar extends LitElement {
  static override styles = [buttonStyle, dialogStyle, menuStyle, toolbarStyle]

  @queryAsync('#myAyabMenuButton')
  protected _myAyabMenuButton: Promise<SlButton>
  @queryAsync('#imageMenuButton') protected _imageMenuButton: Promise<SlButton>
  @queryAsync('#toolsMenuButton') protected _toolsMenuButton: Promise<SlButton>
  @queryAsync('#helpMenuButton') protected _helpMenuButton: Promise<SlButton>
  @queryAsync('#imageLoadButton') protected _loadImageButton: Promise<SlButton>
  @queryAsync('#imageLoadInput')
  protected _loadImageInput: Promise<HTMLInputElement>
  @queryAsync('#knitButton') protected _knitButton: Promise<SlButton>
  @queryAsync('#cancelButton') protected _cancelButton: Promise<SlButton>
  @queryAsync('sl-popup') protected _errorAlert: Promise<SlPopup>

  private _menuButtonsEnabledSubscription: Subscription
  private _knitButtonEnabledSubscription: Subscription
  private _cancelButtonEnabledSubscription: Subscription

  // Subscribe to changes in state

  override connectedCallback(): void {
    super.connectedCallback()
    this._knitButtonEnabledSubscription =
      ToolbarFacade.knitButtonEnabled$.subscribe((enabled) =>
        this._knitButtonEnabledChange(enabled)
      )
    this._cancelButtonEnabledSubscription = ToolbarFacade.knitting$.subscribe(
      (enabled) => this._cancelButtonEnabledChange(enabled)
    )
    this._menuButtonsEnabledSubscription =
      ToolbarFacade.menuButtonsEnabled$.subscribe((enabled) =>
        this._menuButtonsEnabledChange(enabled)
      )
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._menuButtonsEnabledSubscription.unsubscribe()
    this._knitButtonEnabledSubscription.unsubscribe()
    this._cancelButtonEnabledSubscription.unsubscribe()
  }

  // Synchronize view to changes in state

  private _knitButtonEnabledChange(enabled: boolean): void {
    this._knitButton.then((button) => {
      button.disabled = !enabled
    })
    this._imageMenuButton.then((button) => {
      button.hidden = !enabled
      // FIXME also hide the 2px gap between My Ayab and Image menu buttons... (maybe)
    })
  }

  private _cancelButtonEnabledChange(enabled: boolean): void {
    this._cancelButton.then((button) => {
      button.disabled = !enabled
    })
  }

  private _menuButtonsEnabledChange(enabled: boolean): void {
    this._myAyabMenuButton.then((button) => {
      button.disabled = !enabled
    })
    this._imageMenuButton.then((button) => {
      button.disabled = !enabled
    })
    this._toolsMenuButton.then((button) => {
      button.disabled = !enabled
    })
    this._helpMenuButton.then((button) => {
      button.disabled = !enabled
    })
    this._loadImageButton.then((button) => {
      button.disabled = !enabled
    })
  }

  // Button click actions

  private _onFileUpload(): void {
    this._loadImageInput.then((input) => {
      try {
        ImageHelper.processFile(input.files && input.files[0]).then(
          (file) =>
            file && ToolbarFacade.imageLoaded(TransformsHelper.serialize(file)!)
        )
      } catch (error) {
        this._showError(error)
      }
    })
  }

  private _showError(error: unknown): void {
    console.error(error)
    this._errorAlert.then((alert) => {
      alert.children[0]!.children[0]!.innerHTML = `${error}`
      alert.active = true
      setTimeout(() => {
        alert.active = false
      }, 3000)
    })
  }

  private _onKnitButtonClick(): void {
    ToolbarFacade.startKnitting()
  }

  private _onCancelButtonClick(): void {
    ToolbarFacade.stopKnitting()
  }

  // Render

  override render() {
    return html`
      <div class="toolbar">
        <div class="menubar">
          <span class="banner">
            <a href="https://ayab-knitting.com/"
              >All&nbsp;Yarns&nbsp;Are&nbsp;Beautiful</a
            >
          </span>
          <span class="space"></span>
          <my-ayab-menu id="myAyabMenuButton"></my-ayab-menu>
          <span class="gap"></span>
          <image-menu id="imageMenuButton"></image-menu>
          <span class="gap"></span>
          <tools-menu id="toolsMenuButton"></tools-menu>
          <span class="gap"></span>
          <help-menu id="helpMenuButton"></help-menu>
          <span class="space"></span>
          <sl-button
            id="imageLoadButton"
            class="solid upload"
            size="medium"
            title="Open image file"
            ><label
              for="imageLoadInput"
              class="upload"
              >Load image</label
            >
          </sl-button>
          <input
            id="imageLoadInput"
            accept="image/png"
            type="file"
            @change=${this._onFileUpload}
            hidden
          />
          <span class="space"></span>
          <sl-button
            id="knitButton"
            class="solid"
            size="medium"
            title="Start knitting"
            @click=${this._onKnitButtonClick}
            disabled
            >Knit</sl-button
          >
          <span class="space"></span>
          <sl-button
            id="cancelButton"
            class="solid"
            size="medium"
            title="Cancel knitting"
            @click=${this._onCancelButtonClick}
            disabled
            >Cancel</sl-button
          >
          <span class="space"></span>
          <sl-popup
            anchor="imageLoadButton"
            placement="bottom"
            distance="8"
            strategy="fixed"
          >
            <sl-alert
              variant="warning"
              size="large"
              open
            >
              <span id="errorAlert"></span>
              <sl-icon
                slot="icon"
                name="exclamation-triangle"
              ></sl-icon>
            </sl-alert>
          </sl-popup>
        </div>
        <div class="logo">
          <img
            src="/AYAB.png"
            alt="AYAB"
          />
        </div>
      </div>
    `
  }
}
