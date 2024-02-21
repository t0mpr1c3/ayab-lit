import { LitElement, html } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { Subscription } from 'rxjs'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'
import { buttonStyle } from '../+styles/button.style'
import { dialogStyle } from '../+styles/dialog.style'
import { menuStyle } from '../+styles/menu.style'
import { ToolbarFacade } from './+facade'
import { CardDialog } from '../shared/elements/CardDialog'

@customElement('tools-menu')
export class ToolsMenu extends LitElement {
  static override styles = [buttonStyle, dialogStyle, menuStyle]

  @property({ type: Boolean }) disabled: boolean

  @queryAsync('#firmwareDialog') firmwareDialog: Promise<CardDialog>
  @queryAsync('#testDialog') testDialog: Promise<CardDialog>

  private _anchorEl: HTMLElement | null = null
  private _open = Boolean(this._anchorEl)
  private _firmwareSubscription: Subscription
  private _testSubscription: Subscription

  // Subscribe to changes in state

  override connectedCallback(): void {
    super.connectedCallback()
    this._firmwareSubscription = ToolbarFacade.firmwareDialogOpened$.subscribe(
      (value) => this._firmwareDialogOpenedChange(value)
    )
    this._testSubscription = ToolbarFacade.testDialogOpened$.subscribe(
      (value) => this._testDialogOpenedChange(value)
    )
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._firmwareSubscription.unsubscribe()
    this._testSubscription.unsubscribe()
  }

  // Synchronize view to changes in state

  private _firmwareDialogOpenedChange(opened: boolean): void {
    this.firmwareDialog.then((dialog: CardDialog) => {
      opened ? dialog?.show() : dialog?.hide()
    })
  }

  private _testDialogOpenedChange(opened: boolean): void {
    this.testDialog.then((dialog: CardDialog) => {
      opened ? dialog?.show() : dialog?.hide()
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

  private _onFirmwareUploadSelection(): void {
    ToolbarFacade.openFirmwareDialog()
  }

  private _onHardwareTestSelection(): void {
    ToolbarFacade.openTestDialog()
  }

  // Dialog actions (FIXME placeholders)

  private _onFirmwareDialogCancel(): void {
    ToolbarFacade.closeFirmwareDialog()
  }

  private _onFirmwareDialogSubmit(): void {
    ToolbarFacade.closeFirmwareDialog()
  }

  private _onTestDialogCancel(): void {
    ToolbarFacade.closeTestDialog()
  }

  private _onTestDialogSubmit(): void {
    ToolbarFacade.closeTestDialog()
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
          id="tools-button"
          aria-haspopup="menu"
          aria-controls=${ifDefined(this._open ? 'tools-menu' : undefined)}
          aria-expanded=${ifDefined(this._open ? 'true' : undefined)}
          @click=${this._onMenuButtonClick}
          ?disabled=${this.disabled}
        >
          <span>Tools</span>
        </sl-button>
        <sl-menu
          id="tools-menu"
          open=${this._open}
          @close=${this._closeMenu}
        >
          <sl-menu-item
            value="0"
            @click=${this._onFirmwareUploadSelection}
            >Upload firmware</sl-menu-item
          >
          <sl-menu-item
            value="1"
            @click=${this._onHardwareTestSelection}
            >Test device</sl-menu-item
          >
        </sl-menu>
      </sl-dropdown>
      <card-dialog
        id="firmwareDialog"
        label="Upload firmware"
        icon="upload"
      >
        FIXME Placeholder
        <div
          slot="footer"
          class="bar"
        >
          <sl-button
            id="firmwareDialogCancelButton"
            variant="primary"
            class="solid paper"
            @click=${this._onFirmwareDialogCancel}
            >Cancel</sl-button
          >
          <sl-button
            id="firmwareDialogSubmitButton"
            variant="primary"
            class="solid"
            @click=${this._onFirmwareDialogSubmit}
            >OK</sl-button
          >
        </div>
      </card-dialog>
      <card-dialog
        id="testDialog"
        label="Test hardware"
        icon="wrench"
      >
        FIXME Placeholder
        <div
          slot="footer"
          class="bar"
        >
          <sl-button
            id="testDialogCancelButton"
            variant="primary"
            class="solid paper"
            @click=${this._onTestDialogCancel}
            >Cancel</sl-button
          >
          <sl-button
            id="testDialogSubmitButton"
            variant="primary"
            class="solid"
            @click=${this._onTestDialogSubmit}
            >OK</sl-button
          >
        </div>
      </card-dialog>
    `
  }
}
