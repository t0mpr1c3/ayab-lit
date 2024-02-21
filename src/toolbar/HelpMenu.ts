import { LitElement, html } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { Subscription } from 'rxjs'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'
import { buttonStyle } from '../+styles/button.style'
import { dialogStyle } from '../+styles/dialog.style'
import { menuStyle } from '../+styles/menu.style'
import { ToolbarFacade } from './+facade'
import '../shared/elements/CardDialog'

@customElement('help-menu')
export class HelpMenu extends LitElement {
  static override styles = [buttonStyle, dialogStyle, menuStyle]

  @property({ type: Boolean }) disabled: boolean

  @queryAsync('#aboutDialog') protected _aboutDialog: Promise<SlDialog>

  private _anchorEl: HTMLElement | null = null
  private _open = Boolean(this._anchorEl)
  private _subscription: Subscription

  // Subscribe to changes in state

  override connectedCallback(): void {
    super.connectedCallback()
    this._subscription = ToolbarFacade.aboutDialogOpened$.subscribe((value) =>
      this._aboutDialogOpenedChange(value)
    )
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._subscription.unsubscribe()
  }

  // Synchronize view to changes in state

  private _aboutDialogOpenedChange(opened: boolean): void {
    this._aboutDialog.then((dialog) => (opened ? dialog.show() : dialog.hide()))
  }

  // Menu visibility methods

  private _onMenuButtonClick(event: MouseEvent): void {
    this._anchorEl = event.currentTarget as HTMLElement
  }

  private _closeMenu(): void {
    this._anchorEl = null
  }

  // Menu selection action

  private _onAboutSelection(): void {
    ToolbarFacade.openAboutDialog()
  }

  // Dialog button action

  private _onAboutDialogClose(): void {
    ToolbarFacade.closeAboutDialog()
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
          id="help-button"
          aria-haspopup="menu"
          aria-controls=${ifDefined(this._open ? 'help-menu' : undefined)}
          aria-expanded=${ifDefined(this._open ? 'true' : undefined)}
          @click=${this._onMenuButtonClick}
          ?disabled=${this.disabled}
        >
          <span>Help</span>
        </sl-button>
        <sl-menu
          id="help-menu"
          open=${this._open}
          @close=${this._closeMenu}
        >
          <sl-menu-item
            value="0"
            @click=${this._onAboutSelection}
          >
            About
          </sl-menu-item>
        </sl-menu>
      </sl-dropdown>
      <sl-dialog
        id="aboutDialog"
        title="About"
        style="
          --footer-spacing: 0 var(--sl-spacing-large) var(--sl-spacing-large) var(--sl-spacing-large);
          --width: calc(800px + 2 * var(--sl-spacing-large));"
        no-header
      >
        <img
          src="/ayab_logo.jpg"
          alt="AYAB: All Yarns Are Beautiful"
        />
        <div
          class="bar"
          slot="footer"
        >
          <span>
            <p class="dialog-block">All Yarns Are Beautiful PACKAGE_VERSION</p>
            <p class="dialog-block">
              Website:
              <a href="http://ayab-knitting.com">http://ayab-knitting.com</a>
            </p>
            <p class="dialog-block">
              Manual:
              <a href="http://manual.ayab-knitting.com"
                >http://manual.ayab-knitting.com</a
              >
            </p>
          </span>
          <span>
            <sl-button
              id="aboutDialogCloseButton"
              variant="primary"
              class="solid"
              @click=${this._onAboutDialogClose}
              >Close</sl-button
            >
          </span>
        </div>
      </sl-dialog>
    `
  }
}
