import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import { dialogStyle } from '../+styles/dialog.style'

@customElement('card-dialog')
export class CardDialog extends LitElement {
  static override styles = [dialogStyle]

  @property({ type: String }) icon: string
  @property({ type: String }) label: string
  @property({ type: Boolean }) open: boolean

  // Public methods

  hide() {
    this.open = false
  }

  show() {
    this.open = true
  }

  // Render

  override render() {
    return html`
      <sl-dialog
        style="--width: calc(var(--card-width) + 2rem); --body-spacing: 0; --footer-spacing: 1rem;"
        no-header
        ?open=${this.open}
      >
        <div class="card-header">
          <span class="bar">
            <span>${this.label}</span>
            ${when(
              this.icon,
              () => html`<sl-icon name=${this.icon}></sl-icon>`,
              () => nothing
            )}
          </span>
        </div>
        <div class="card-body">
          <slot></slot>
        </div>
        <div slot="footer">
          <slot name="footer"></slot>
        </div>
      </sl-dialog>
    `
  }
}
