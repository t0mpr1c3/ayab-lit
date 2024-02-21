import { LitElement, html } from 'lit'
import { customElement, property, queryAsync } from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
import { Subscription } from 'rxjs'
import { OptionsFacade } from './+facade'

// NB element is unstyled: styles are inherited from parent
@customElement('knit-side-checkbox')
export class KnitSideCheckbox extends LitElement {
  @property({ type: Boolean }) disabled: boolean
  @property({ type: Boolean }) checked: boolean

  @queryAsync('sl-checkbox') public checkbox: Promise<SlCheckbox>

  private _knitSideSubscription: Subscription

  // Subscribe to changes in state

  override connectedCallback(): void {
    super.connectedCallback()
    this._knitSideSubscription = OptionsFacade.knitSide$.subscribe(
      (knitSide) => {
        this._knitSideChange(knitSide)
      }
    )
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._knitSideSubscription.unsubscribe()
  }

  // Synchronize element to changes in state

  private _knitSideChange(knitSide: boolean): void {
    this.checked = knitSide
  }

  // Input action

  private _change(knitSide: boolean): void {
    if (!this.disabled) {
      this._knitSideChange(knitSide)
    }
  }

  // Render

  // Enable access to enclosing form by rendering into child
  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this
  }

  override render() {
    return html`
      <div
        class="bar"
        style="margin-top: 0.25rem;"
      >
        <span>
          <sl-checkbox
            id="knitSideOption"
            size="small"
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            >Knit&nbsp;side</sl-checkbox
          >
        </span>
        <span style="margin-right: 1rem;">
          <img
            id="knitSideIcon"
            class="knit-side-icon"
            style=${`opacity: ${this.disabled ? '.38' : '.87'}`}
            src=${this.checked ? '/knitSideE.png' : '/purlSideE.png'}
          />
        </span>
      </div>
    `
  }
}
