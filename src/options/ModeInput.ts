import { LitElement, html, css } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/option/option.js'
import '@shoelace-style/shoelace/dist/components/select/select.js'
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.js'
import { buttonStyle } from '../+styles/button.style'
import { inputStyle } from '../+styles/input.style'
import { selectStyle } from '../+styles/select.style'
import { ModeEnum } from '../shared/models/ModeEnum.model'
import { OptionsFacade } from './+facade'

// NB element is unstyled: styles are inherited from parent
@customElement('mode-input')
export class ModeInput extends LitElement {
  static override styles = [buttonStyle, inputStyle, selectStyle]

  @property({ type: Boolean }) disabled: boolean
  @property({ type: Number }) value = 0

  @queryAsync('sl-select') public select: Promise<SlSelect>
  @queryAsync('sl-input') public input: Promise<SlInput>

  @queryAsync('div') protected _div: Promise<HTMLDivElement>

  private _modeSubscription: Subscription

  // Subscribe to changes in state

  override connectedCallback(): void {
    super.connectedCallback()
    this._modeSubscription = OptionsFacade.mode$.subscribe((mode) => {
      this._modeChange(mode)
    })
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._modeSubscription.unsubscribe()
  }

  // Synchronize element to changes in state

  private _modeChange(mode: ModeEnum): void {
    this._div.then((div) => (div.hidden = mode === 0 || mode === 4))
  }

  // Input action

  private _select(mode: ModeEnum): void {
    if (!this.disabled) {
      this.value = mode
      this._modeChange(mode)
    }
  }

  // Render

  // Enable access to enclosing form by rendering into child
  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this
  }

  override render() {
    return html`
      <sl-select
        label="Knitting mode"
        size="small"
        value=${this.value}
        ?disabled=${this.disabled}
      >
        <sl-option
          value="0"
          @click=${() => this._select(0)}
          >Singlebed</sl-option
        >
        <sl-option
          value="1"
          @click=${() => this._select(1)}
          >Classic</sl-option
        >
        <sl-option
          value="2"
          @click=${() => this._select(2)}
          >Middle Colors x2</sl-option
        >
        <sl-option
          value="3"
          @click=${() => this._select(3)}
          >Heart of Pluto</sl-option
        >
        <sl-option
          value="4"
          @click=${() => this._select(4)}
          >Circular</sl-option
        >
      </sl-select>
      <div
        style="margin-top: 1rem;"
        hidden
      >
        <sl-input
          name="colors"
          label="Colors"
          type="number"
          value="2"
          min="2"
          max="6"
          size="small"
          ?disabled=${this.disabled}
        >
          Colors
        </sl-input>
      </div>
    `
  }
}
