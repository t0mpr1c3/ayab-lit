import { LitElement, html, css } from 'lit'
import { customElement, property, queryAsync, state } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js'
import { buttonStyle } from '../+styles/button.style'
import { inputStyle } from '../+styles/input.style'
import { optionsStyle } from '../+styles/options.style'
import { ColorHelper } from './helpers/color.helper'

// NB element is unstyled: styles are inherited from parent
@customElement('needle-input')
export class NeedleInput extends LitElement {
  static override styles = [buttonStyle, inputStyle, optionsStyle]

  @property({ type: Boolean }) disabled: boolean
  @property({ type: String }) name: string
  @property({ type: String }) label: string
  @property({ type: Number }) max: number

  @state() protected _color: string = ''

  @queryAsync('sl-input') public input: Promise<SlInput>
  @queryAsync('sl-button') public button: Promise<SlButton>
  @queryAsync('sl-icon') public icon: Promise<SlIcon>

  // Handle button click

  private _toggleColor(): void {
    if (!this._color) {
      this._color = ColorHelper.iconInitialColor(this.name)
    }
    this._color = this._color === 'orange' ? 'green' : 'orange'
    this.button.then((button) => {
      button.className = this._color
    })
    this.icon.then((icon) => {
      icon.className = this._color
      icon.name = ColorHelper.iconName(this._color)
    })
  }

  // Render

  // Enable access to enclosing form by rendering into child
  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this
  }

  override render() {
    return html`
      <span class="needle-input">
        <sl-input
          id=${`${this.name}-needle`}
          label=${this.label}
          type="number"
          value="1"
          min="1"
          max=${this.max}
          size="small"
          ?disabled=${this.disabled}
        >
          <sl-button
            id=${`${this.name}-color`}
            slot="suffix"
            size="small"
            class=${ColorHelper.iconInitialColor(this.name)}
            @click=${this._toggleColor}
            ?disabled=${this.disabled}
            circle
          >
            <sl-icon
              name=${ColorHelper.iconName(
                ColorHelper.iconInitialColor(this.name)
              )}
            ></sl-icon>
          </sl-button>
        </sl-input>
      </span>
    `
  }
}
