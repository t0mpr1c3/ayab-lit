import { LitElement, html, nothing } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import { buttonStyle } from '../+styles/button.style'
import { checkboxStyle } from '../+styles/checkbox.style'
import { dialogStyle } from '../+styles/dialog.style'
import { ToolbarFacade } from '../toolbar/+facade'
import { ImageFacade } from './+facade'
import { MirrorsHelper } from './helpers/mirrors.helper'

@customElement('mirror-dialog')
export class MirrorDialog extends LitElement {
  static override styles = [buttonStyle, checkboxStyle, dialogStyle]

  @property({ type: Boolean }) open: boolean

  @queryAsync('form') protected _form: Promise<HTMLFormElement>
  @queryAsync('#topCheckbox') protected _topCheckbox: Promise<SlCheckbox>
  @queryAsync('#bottomCheckbox') protected _bottomCheckbox: Promise<SlCheckbox>
  @queryAsync('#leftCheckbox') protected _leftCheckbox: Promise<SlCheckbox>
  @queryAsync('#rightCheckbox') protected _rightCheckbox: Promise<SlCheckbox>

  // Public methods

  hide() {
    this.open = false
  }

  show() {
    this._topCheckbox.then((checkbox) => {
      checkbox.checked = false
    })
    this._bottomCheckbox.then((checkbox) => {
      checkbox.checked = false
    })
    this._leftCheckbox.then((checkbox) => {
      checkbox.checked = false
    })
    this._rightCheckbox.then((checkbox) => {
      checkbox.checked = false
    })
    this.open = true
  }

  // Button click actions

  private _onCancelButtonClick(event: Event): void {
    ToolbarFacade.closeImageReflectDialog()
  }

  private _onSubmitButtonClick(event: Event): void {
    event.preventDefault()
    this._form.then((form) => {
      ImageFacade.reflectImage(MirrorsHelper.formSettings(new FormData(form)))
    })
    ToolbarFacade.closeImageReflectDialog()
  }

  // Render

  override render() {
    return html`
      <card-dialog
        label="Add mirrors"
        icon="symmetry-vertical"
        ?open=${this.open}
      >
        <form>
          <div class="flex-container">
            <div class="flex">
              <sl-checkbox
                id="leftCheckbox"
                name="left"
                >Left</sl-checkbox
              >
            </div>
            <div class="flex">
              <sl-checkbox
                id="rightCheckbox"
                name="right"
                >Right</sl-checkbox
              >
            </div>
            <div class="flex">
              <sl-checkbox
                id="topCheckbox"
                name="top"
                >Top</sl-checkbox
              >
            </div>
            <div class="flex">
              <sl-checkbox
                id="bottomCheckbox"
                name="bottom"
                >Bottom</sl-checkbox
              >
            </div>
          </div>
        </form>
        <div
          slot="footer"
          class="bar"
        >
          <sl-button
            variant="primary"
            class="solid paper"
            @click=${this._onCancelButtonClick}
            >Cancel</sl-button
          >
          <sl-button
            type="submit"
            variant="primary"
            class="solid"
            @click=${this._onSubmitButtonClick}
            >OK</sl-button
          >
        </div>
      </card-dialog>
    `
  }
}
