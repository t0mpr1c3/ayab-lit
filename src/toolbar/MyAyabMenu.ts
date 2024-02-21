import { LitElement, html } from 'lit'
import { customElement, property, queryAsync, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { Subscription } from 'rxjs'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'
import { buttonStyle } from '../+styles/button.style'
import { dialogStyle } from '../+styles/dialog.style'
import { inputStyle } from '../+styles/input.style'
import { menuStyle } from '../+styles/menu.style'
import { LoginDialog } from '../profile/LoginDialog'
import '../profile/LoginDialog'
import { RegisterDialog } from '../profile/RegisterDialog'
import '../profile/RegisterDialog'
import { SettingsDialog } from '../profile/SettingsDialog'
import '../profile/SettingsDialog'
import { ToolbarFacade } from './+facade'

@customElement('my-ayab-menu')
export class MyAyabMenu extends LitElement {
  static override styles = [buttonStyle, dialogStyle, inputStyle, menuStyle]

  @property({ type: String }) username = '' // name of logged in user
  @property({ type: Boolean }) disabled: boolean

  @queryAsync('sl-button') protected _button: Promise<SlButton>
  @queryAsync('sl-icon') protected _icon: Promise<SlIcon>
  @queryAsync('login-dialog') protected _loginDialog: Promise<LoginDialog>
  @queryAsync('register-dialog')
  protected _registerDialog: Promise<RegisterDialog>
  @queryAsync('settings-dialog')
  protected _settingsDialog: Promise<SettingsDialog>

  private _anchorEl: HTMLElement | null = null
  private _usernameSubscription: Subscription
  private _loginSubscription: Subscription
  private _registerSubscription: Subscription
  private _settingsSubscription: Subscription

  //@state() protected _open = Boolean(this._anchorEl)

  // Subscribe to changes in state

  override connectedCallback(): void {
    super.connectedCallback()
    this._usernameSubscription = ToolbarFacade.username$.subscribe((value) =>
      this._usernameChange(value)
    )
    this._loginSubscription = ToolbarFacade.loginDialogOpened$.subscribe(
      (value) => this._loginDialogOpenedChange(value)
    )
    this._registerSubscription = ToolbarFacade.registerName$.subscribe(
      (value) => this._registerNameChange(value)
    )
    this._settingsSubscription = ToolbarFacade.settingsDialogOpened$.subscribe(
      (value) => this._settingsDialogOpenedChange(value)
    )
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._usernameSubscription.unsubscribe()
    this._loginSubscription.unsubscribe()
    this._registerSubscription.unsubscribe()
    this._settingsSubscription.unsubscribe()
  }

  // Synchronize view to changes in state

  private _usernameChange(username: string): void {
    if (this.username === username) return
    this.username = username
    this._button.then(
      (button) => (button.title = !username ? '' : 'User: ' + username)
    )
    this._icon.then((icon) => {
      icon.name = !username ? 'person' : 'person-fill'
      icon.className = !username ? 'grey' : ''
    })
  }

  private _loginDialogOpenedChange(opened: boolean): void {
    this._loginDialog.then((dialog) => (opened ? dialog.show() : dialog.hide()))
  }

  private _registerNameChange(username: string): void {
    this._registerDialog.then((dialog) => {
      dialog.username = username
      !!username ? dialog.show() : dialog.hide()
    })
  }

  private _settingsDialogOpenedChange(opened: boolean): void {
    this._settingsDialog.then((dialog) => {
      opened ? dialog.show() : dialog.hide()
    })
  }

  // Menu visibility methods

  private _onMenuButtonClick(event: MouseEvent): void {
    this._anchorEl = event.currentTarget as HTMLElement
  }

  private _closeMenu(): void {
    this._anchorEl = null
  }

  // Menu selection actions

  private _onLoginSelection(): void {
    if (!this.username) {
      ToolbarFacade.openLoginDialog()
    }
  }

  private _onSettingsSelection(): void {
    if (!!this.username) {
      ToolbarFacade.openSettingsDialog()
    }
  }

  private _onLogoutSelection(): void {
    ToolbarFacade.logout()
  }

  // Render

  override render() {
    return html`
      <sl-dropdown>
        <sl-button
          slot="trigger"
          variant="text"
          size="medium"
          class="menu paper"
          id="my-ayab-button"
          aria-haspopup="menu"
          aria-controls=${ifDefined(this._open ? 'my-ayab-menu' : undefined)}
          aria-expanded=${ifDefined(this._open ? 'true' : undefined)}
          @click=${this._onMenuButtonClick}
          ?disabled=${this.disabled}
        >
          <sl-icon
            slot="prefix"
            name="person"
            class="grey"
          ></sl-icon>
          <span>My Ayab</span>
        </sl-button>
        <div>
          <sl-menu
            id="my-ayab-menu"
            @close=${this._closeMenu}
          >
            <sl-menu-item
              value="0"
              @click=${this._onLoginSelection}
              ?disabled=${!!this.username}
              >Sign in</sl-menu-item
            >
            <sl-menu-item
              value="1"
              @click=${this._onSettingsSelection}
              ?disabled=${!this.username}
              >Settings</sl-menu-item
            >
            <sl-menu-item
              value="2"
              @click=${this._onLogoutSelection}
              ?disabled=${!this.username}
              >Sign out</sl-menu-item
            >
          </sl-menu>
        </div>
      </sl-dropdown>
      <login-dialog></login-dialog>
      <register-dialog></register-dialog>
      <settings-dialog></settings-dialog>
    `
  }
}
