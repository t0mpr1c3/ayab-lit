import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import { buttonStyle } from '../+styles/button.style'
import { dialogStyle } from '../+styles/dialog.style'
import { inputStyle } from '../+styles/input.style'
import '../shared/elements/CardDialog'
import { ProfileFacade } from './+facade'

@customElement('register-dialog')
export class RegisterDialog extends LitElement {
  static override styles = [buttonStyle, dialogStyle, inputStyle]

  @property({ type: Boolean }) open: boolean
  @property({ type: String }) username: string

  // Public methods

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  // Dialog button actions

  private _onCancelButtonClick(): void {
    ProfileFacade.closeRegisterDialog()
  }

  private _onOkButtonClick(): void {
    ProfileFacade.register(this.username)
    ProfileFacade.closeRegisterDialog()
  }

  // Render

  override render() {
    return html`
      <card-dialog
        label="Welcome to AYAB"
        icon="person-fill-add"
        ?open=${this.open}
      >
        <span>Add new user <emph>${this.username}</emph>?</span>
        <div
          slot="footer"
          class="bar"
        >
          <sl-button
            id="cancelButton"
            variant="primary"
            class="solid paper"
            @click=${this._onCancelButtonClick}
            >Cancel</sl-button
          >
          <sl-button
            id="okButton"
            variant="primary"
            class="solid"
            slot="footer"
            @click=${this._onOkButtonClick}
            >OK</sl-button
          >
        </div>
      </card-dialog>
    `
  }
}
