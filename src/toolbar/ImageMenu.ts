import { LitElement, html } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { Subscription } from 'rxjs'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/divider/divider.js'
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js'
import '@shoelace-style/shoelace/dist/components/menu/menu.js'
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js'
import * as fromImage from '../image/+redux'
import * as fromToolbar from './+redux'
import { buttonStyle } from '../+styles/button.style'
import { dialogStyle } from '../+styles/dialog.style'
import { menuStyle } from '../+styles/menu.style'
import { ImageFacade } from '../image/+facade'
import { ToolbarFacade } from './+facade'
import '../image/ScaleDialog'
import { ScaleDialog } from '../image/ScaleDialog'
import '../image/MirrorDialog'
import { MirrorDialog } from '../image/MirrorDialog'

@customElement('image-menu')
export class ImageMenu extends LitElement {
  static override styles = [buttonStyle, dialogStyle, menuStyle]

  @property({ type: Boolean }) disabled: boolean

  @queryAsync('form') protected _form: Promise<HTMLFormElement>
  @queryAsync('#stretchImageDialog')
  protected _stretchImageDialog: Promise<ScaleDialog>
  @queryAsync('#repeatImageDialog')
  protected _repeatImageDialog: Promise<ScaleDialog>
  @queryAsync('#reflectImageDialog')
  protected _reflectImageDialog: Promise<MirrorDialog>

  private _anchorEl: HTMLElement | null = null
  private _open = Boolean(this._anchorEl)
  private _stretchSubscription: Subscription
  private _repeatSubscription: Subscription
  private _reflectSubscription: Subscription

  // Subscribe to changes in state

  override connectedCallback(): void {
    super.connectedCallback()
    this._stretchSubscription =
      ToolbarFacade.imageStretchDialogOpened$.subscribe((opened) =>
        this._imageStretchDialogOpenedChange(opened)
      )
    this._repeatSubscription = ToolbarFacade.imageRepeatDialogOpened$.subscribe(
      (opened) => this._imageRepeatDialogOpenedChange(opened)
    )
    this._reflectSubscription =
      ToolbarFacade.imageReflectDialogOpened$.subscribe((opened) =>
        this._imageReflectDialogOpenedChange(opened)
      )
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._stretchSubscription.unsubscribe()
    this._repeatSubscription.unsubscribe()
    this._reflectSubscription.unsubscribe()
  }

  // Synchronize view to changes in state

  private _imageStretchDialogOpenedChange(opened: boolean): void {
    this._stretchImageDialog.then((dialog) =>
      opened ? dialog.show() : dialog.hide()
    )
  }

  private _imageRepeatDialogOpenedChange(opened: boolean): void {
    this._repeatImageDialog.then((dialog) =>
      opened ? dialog.show() : dialog.hide()
    )
  }

  private _imageReflectDialogOpenedChange(opened: boolean): void {
    this._reflectImageDialog.then((dialog) =>
      opened ? dialog.show() : dialog.hide()
    )
  }

  // Menu visibility methods

  private _onMenuButtonClick(event: MouseEvent): void {
    this._anchorEl = event.currentTarget as HTMLElement
  }

  private _closeMenu(): void {
    this._anchorEl = null
  }

  // Menu selection actions

  private _onInvertSelection(): void {
    ImageFacade.invertImage()
  }

  private _onStretchSelection(): void {
    ToolbarFacade.openImageStretchDialog()
  }

  private _onRepeatSelection(): void {
    ToolbarFacade.openImageRepeatDialog()
  }

  private _onReflectSelection(): void {
    ToolbarFacade.openImageReflectDialog()
  }

  private _onHFlipSelection(): void {
    ImageFacade.hFlipImage()
  }

  private _onVFlipSelection(): void {
    ImageFacade.vFlipImage()
  }

  private _onRotateLeftSelection(): void {
    ImageFacade.rotateImageLeft()
  }

  private _onRotateRightSelection(): void {
    ImageFacade.rotateImageRight()
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
          id="image-button"
          aria-haspopup="menu"
          aria-controls=${ifDefined(this._open ? 'image-menu' : undefined)}
          aria-expanded=${ifDefined(this._open ? 'true' : undefined)}
          @click=${this._onMenuButtonClick}
          ?disabled=${this.disabled}
        >
          <span>Image</span>
        </sl-button>
        <sl-menu
          id="image-menu"
          open=${this._open}
          @close=${this._closeMenu}
        >
          <sl-menu-item
            value="0"
            @click=${this._onInvertSelection}
            >Invert</sl-menu-item
          >
          <sl-divider></sl-divider>
          <sl-menu-item
            value="1"
            @click=${this._onStretchSelection}
            >Stretch</sl-menu-item
          >
          <sl-menu-item
            value="2"
            @click=${this._onRepeatSelection}
            >Repeat</sl-menu-item
          >
          <sl-menu-item
            value="3"
            @click=${this._onReflectSelection}
            >Reflect</sl-menu-item
          >
          <sl-divider></sl-divider>
          <sl-menu-item
            value="4"
            @click=${this._onHFlipSelection}
            >Horizontal flip</sl-menu-item
          >
          <sl-menu-item
            value="5"
            @click=${this._onVFlipSelection}
            >Vertical flip</sl-menu-item
          >
          <sl-divider></sl-divider>
          <sl-menu-item
            value="6"
            @click=${this._onRotateLeftSelection}
            >Rotate left</sl-menu-item
          >
          <sl-menu-item
            value="7"
            @click=${this._onRotateRightSelection}
            >Rotate right</sl-menu-item
          >
        </sl-menu>
      </sl-dropdown>
      <scale-dialog
        id="stretchImageDialog"
        label="Stretch image"
        icon="aspect-ratio"
        transformaction=${fromImage.stretchImageAction.type}
        closeaction=${fromToolbar.closeImageStretchDialogAction.type}
      ></scale-dialog>
      <scale-dialog
        id="repeatImageDialog"
        label="Repeat image"
        icon="grid-fill"
        transformaction=${fromImage.repeatImageAction.type}
        closeaction=${fromToolbar.closeImageRepeatDialogAction.type}
      ></scale-dialog>
      <mirror-dialog id="reflectImageDialog"></mirror-dialog>
    `
  }
}
