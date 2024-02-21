import { LitElement, html } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { Subscription } from 'rxjs'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import { buttonStyle } from '../+styles/button.style'
import { checkboxStyle } from '../+styles/checkbox.style'
import { dialogStyle } from '../+styles/dialog.style'
import { inputStyle } from '../+styles/input.style'
import { menuStyle } from '../+styles/menu.style'
import { selectStyle } from '../+styles/select.style'
import { defaultSettings, settings } from '../shared/models/Settings.model'
import { SettingsHelper } from '../shared/helpers/settings.helper'
import { User } from '../shared/models/User.model'
import { ProfileFacade } from './+facade'
import '../shared/CardDialog'
import '../shared/SelectInput'

@customElement('settings-dialog')
export class SettingsDialog extends LitElement {
  static override styles = [
    buttonStyle,
    checkboxStyle,
    dialogStyle,
    inputStyle,
    menuStyle,
    selectStyle,
  ]

  @property({ type: Boolean }) open: boolean

  @queryAsync('form') form: Promise<HTMLFormElement>

  private _subscription: Subscription
  private _user: User | null

  // Public methods

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  // Subscribe to changes in state

  override connectedCallback() {
    super.connectedCallback()
    this._subscription = ProfileFacade.user$.subscribe((user) => {
      this._userChange(user)
    })
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this._subscription.unsubscribe()
  }

  // Respond to changes in state

  private _userChange(user: User | null): void {
    this._user = user
  }

  // Dialog button actions

  private _onCancelButtonClick(): void {
    ProfileFacade.closeSettingsDialog()
  }

  private _onSubmitButtonClick(event: SubmitEvent): void {
    event.preventDefault()
    this.form.then((form) =>
      ProfileFacade.submitSettings({
        name: this._user!.name,
        settings: SettingsHelper.formSettings(new FormData(form)),
      })
    )
    ProfileFacade.closeSettingsDialog()
  }

  // Render

  override render() {
    return html`
      <card-dialog
        label="Settings"
        icon="gear"
        ?open=${this.open}
      >
        <form>
          <div class="flex-container">
            ${when(this._user !== null, () => {
              /* Populate form with User settings */
              return Object.entries(this._user!.settings).map((entry) => {
                let k = entry[0]
                let v: any = entry[1]
                let setting = settings[Object.keys(defaultSettings).indexOf(k)]
                if (!setting) return html``
                if (setting.type === 'boolean') {
                  /* Render checkbox if Boolean setting */
                  return html`
                    <div class="flex">
                      <sl-checkbox
                        name=${setting.key}
                        form="settingsForm"
                        ?checked=${v}
                        >${setting.title}</sl-checkbox
                      >
                    </div>
                  `
                } else {
                  /* Render select input if Enum setting */
                  return html`
                    <div class="flex">
                      <select-input
                        enum=${JSON.stringify(setting.enum)}
                        label=${setting.title}
                        name=${setting.key}
                        size="medium"
                        value=${v}
                      >
                      </select-input>
                    </div>
                  `
                }
              })
            })}
          </div>
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
            form="settingsForm"
            class="solid"
            slot="footer"
            @click=${this._onSubmitButtonClick}
            >OK</sl-button
          >
        </div>
      </card-dialog>
    `
  }
}
