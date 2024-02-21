import { LitElement, html } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import { buttonStyle } from '../+styles/button.style'
import { dialogStyle } from '../+styles/dialog.style'
import { inputStyle } from '../+styles/input.style'
import * as fromRoot from '../+redux'
import { Scale } from './models/Scale.model'

@customElement('scale-dialog')
export class ScaleDialog extends LitElement {
  static override styles = [buttonStyle, dialogStyle, inputStyle]

  @property({ type: String }) label: string
  @property({ type: String }) icon: string
  @property({ type: Boolean }) open: boolean
  @property({ type: String }) transformaction: string
  @property({ type: String }) closeaction: string

  @queryAsync('form') protected _form: Promise<HTMLFormElement>
  @queryAsync('#horizontalInput')
  protected _horizontalInput: Promise<HTMLFormElement>
  @queryAsync('#verticalInput')
  protected _verticalInput: Promise<HTMLFormElement>

  // Public methods

  hide() {
    this.open = false
  }

  show() {
    this._horizontalInput.then((input) => {
      input.value = '1'
    })
    this._verticalInput.then((input) => {
      input.value = '1'
    })
    this.open = true
  }

  // Button click actions

  private _onCancelButtonClick(): void {
    fromRoot.store.dispatch({ type: this.closeaction })
  }

  private _onSubmitButtonClick(event: Event): void {
    event.preventDefault()
    this._form.then((form) => {
      const formData = new FormData(form)
      const values = [...formData.values()].map((x) => parseInt(x as string))
      const scale = new Scale(...values)
      fromRoot.store.dispatch({
        type: this.transformaction,
        payload: { scale: scale },
      })
    })
    fromRoot.store.dispatch({ type: this.closeaction })
  }

  // Render

  override render() {
    return html`
      <card-dialog
        label=${this.label}
        icon=${this.icon}
        ?open=${this.open}
      >
        <form>
          <div class="flex-container">
            <div class="flex">
              <sl-input
                id="horizontalInput"
                name="x"
                label="Horizontal"
                type="number"
                min="1"
                max="10"
              ></sl-input>
            </div>
            <div class="flex">
              <sl-input
                id="verticalInput"
                name="y"
                label="Vertical"
                type="number"
                min="1"
                max="10"
              ></sl-input>
            </div>
          </div>
        </form>
        <div
          slot="footer"
          class="bar"
        >
          <sl-button
            id="scaleDialogCancelButton"
            variant="primary"
            class="solid paper"
            @click=${this._onCancelButtonClick}
            >Cancel</sl-button
          >
          <sl-button
            id="scaleDialogSubmitButton"
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
