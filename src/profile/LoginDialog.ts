import { LitElement, html } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js'
import { buttonStyle } from '../+styles/button.style'
import { dialogStyle } from '../+styles/dialog.style'
import { inputStyle } from '../+styles/input.style'
import { ProfileFacade } from './+facade'
import '../shared/CardDialog'

@customElement('login-dialog')
export class LoginDialog extends LitElement {
  static override styles = [buttonStyle, dialogStyle, inputStyle]

  @property({ type: Boolean }) open: boolean

  @queryAsync('form') form: Promise<HTMLFormElement>
  @queryAsync('sl-input') input: Promise<SlInput>

  // Public methods

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  // Attach event listeners to form

  override connectedCallback(): void {
    super.connectedCallback()
    this._attachEvents()
  }

  private _attachEvents(): void {
    this.form.then((form) => {
      this.input.then((input) => {
        input.addEventListener('sl-input', () => this._validateUsername(input))
        input.value = ''
      })
      Promise.all([
        customElements.whenDefined('sl-button'),
        customElements.whenDefined('sl-input'),
      ]).then(() =>
        form.addEventListener('submit', (event) => this._onSubmit(form, event))
      )
    })
  }

  private _validateUsername(input: SlInput): void {
    const v = input.validity
    if (v.valueMissing) {
      input.setCustomValidity('Please enter your user name.')
    } else if (v.tooShort) {
      input.setCustomValidity('User name is too short.')
    } else if (v.tooLong) {
      input.setCustomValidity('User name is too long.')
    } else if (v.patternMismatch) {
      input.setCustomValidity('Alphanumeric characters and underscore only.')
    } else {
      input.setCustomValidity('')
    }
    input.reportValidity()
  }

  // Dialog button actions

  private _onCancelButtonClick(): void {
    ProfileFacade.closeLoginDialog()
  }

  private _onSubmit(form: HTMLFormElement, event: SubmitEvent): void {
    event.preventDefault()
    const formData = new FormData(form)
    ProfileFacade.submitLogin(`${formData.get('username')}`)
    ProfileFacade.closeLoginDialog()
  }

  // Render

  override render() {
    return html`
      <card-dialog
        label="Sign in"
        icon="person-fill"
        ?open=${this.open}
      >
        <form id="loginForm">
          <sl-input
            type="text"
            label="User name"
            name="username"
            value=""
            pattern="[A-Za-z0-9_]*"
            minlength="2"
            maxlength="20"
          ></sl-input>
        </form>
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
            id="submitButton"
            variant="primary"
            type="submit"
            form="loginForm"
            class="solid"
            slot="footer"
            >OK</sl-button
          >
        </div>
      </card-dialog>
    `
  }
}
