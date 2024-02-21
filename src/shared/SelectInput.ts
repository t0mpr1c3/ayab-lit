import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/option/option.js'
import '@shoelace-style/shoelace/dist/components/select/select.js'

// NB element is unstyled: styles are inherited from parent
@customElement('select-input')
export class SelectInput extends LitElement {
  @property({ type: Boolean }) disabled: boolean
  @property({ type: String }) enum: string
  @property({ type: String }) label: string = ''
  @property({ type: String }) name: string
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium'
  @property({ type: Number }) value: number = 0

  private _items: string[]

  // Parse property `enum` into array of strings
  override connectedCallback() {
    super.connectedCallback()
    this._items = JSON.parse(this.enum || '[]')
  }

  // Render

  // Enable access to enclosing form by rendering into child
  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this
  }

  private _renderOption(element: string, index: number) {
    return html`<sl-option value=${index}>${element}</sl-option>`
  }

  override render() {
    return html`
      <sl-select
        id=${`${this.name}-select`}
        label=${this.label}
        name=${this.name}
        size=${this.size}
        value=${this.value}
        ?disabled=${this.disabled}
      >
        ${this._items.map((element, index) =>
          this._renderOption(element, index)
        )}
      </sl-select>
    `
  }
}
