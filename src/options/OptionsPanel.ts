import { LitElement, html } from 'lit'
import { customElement, property, queryAsync, state } from 'lit/decorators.js'
import { Subscription } from 'rxjs'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/select/select.js'
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.js'
import { buttonStyle } from '../+styles/button.style'
import { checkboxStyle } from '../+styles/checkbox.style'
import { inputStyle } from '../+styles/input.style'
import { optionsStyle } from '../+styles/options.style'
import { selectStyle } from '../+styles/select.style'
import { EnumHelper } from '../shared/helpers/enum.helper'
import { ColorHelper } from './helpers/color.helper'
import { AlignmentEnum } from '../shared/models/AlignmentEnum.model'
import { ColorEnum } from '../shared/models/ColorEnum.model'
import { ModeEnum } from '../shared/models/ModeEnum.model'
import { Machine, MachineEnum } from '../shared/models/MachineEnum.model'
import { Settings, defaultSettings } from '../shared/models/Settings.model'
import { User } from '../shared/models/User.model'
import '../shared/SelectInput'
import './ModeInput'
import { ModeInput } from './ModeInput'
import './NeedleInput'
import { NeedleInput } from './NeedleInput'
import './KnitSideCheckbox'
import { KnitSideCheckbox } from './KnitSideCheckbox'
import * as fromOptions from './+redux'
import { OptionsFacade } from './+facade'

@customElement('options-panel')
export class OptionsPanel extends LitElement {
  static override styles = [
    buttonStyle,
    checkboxStyle,
    inputStyle,
    optionsStyle,
    selectStyle,
  ]

  @property({ type: Boolean }) disabled: boolean

  @state() protected _machine: MachineEnum = 0
  @state() protected _imageHeight: number = 1

  @queryAsync('#machineOption') machineOption: Promise<HTMLSpanElement>
  @queryAsync('#modeInput') modeInput: Promise<ModeInput>
  @queryAsync('#startRowOption') startRowOption: Promise<SlInput>
  @queryAsync('#infRepeatOption') infRepeatOption: Promise<SlCheckbox>
  @queryAsync('#startNeedleInput') startNeedleInput: Promise<NeedleInput>
  @queryAsync('#stopNeedleInput') stopNeedleInput: Promise<NeedleInput>
  @queryAsync('#alignment-select') alignmentOption: Promise<SlSelect>
  @queryAsync('#knitSideOption') knitSideOption: Promise<KnitSideCheckbox>

  private _options: fromOptions.State = { ...fromOptions.initialState }
  private _loggedIn: boolean = false
  private _settings: Settings = defaultSettings

  private _optionsSubscription: Subscription
  private _userSubscription: Subscription
  private _imageHeightSubscription: Subscription

  override connectedCallback(): void {
    super.connectedCallback()

    // Subscribe to changes in state
    this._userSubscription = OptionsFacade.user$.subscribe((user) => {
      this._userChange(user)
    })
    this._optionsSubscription = OptionsFacade.options$.subscribe((options) => {
      this._optionsChange(options)
    })
    this._imageHeightSubscription = OptionsFacade.imageHeight$.subscribe(
      (rows) => {
        this._imageHeightChange(rows)
      }
    )

    // Add event handlers to inputs
    this.modeInput.then((mode) => {
      mode.select.then((select) =>
        select.addEventListener('sl-change', () => this._onModeInput(select))
      )
      mode.input.then((input) =>
        input.addEventListener('sl-change', () => this._onColorsInput(input))
      )
    })
    this.startRowOption.then((input) =>
      input.addEventListener('sl-change', () => this._onStartRowInput(input))
    )
    this.infRepeatOption.then((input) =>
      input.addEventListener('sl-change', () => this._onInfRepeatInput(input))
    )
    this.startNeedleInput.then((needle) => {
      needle.input.then((input) =>
        input.addEventListener('sl-change', () =>
          this._onStartNeedleInput(input)
        )
      )
      needle.button.then((button) =>
        button.addEventListener('click', () => this._onStartColorInput(button))
      )
    })
    this.stopNeedleInput.then((needle) => {
      needle.input.then((input) =>
        input.addEventListener('sl-change', () =>
          this._onStopNeedleInput(input)
        )
      )
      needle.button.then((button) =>
        button.addEventListener('click', () => this._onStopColorInput(button))
      )
    })
    this.alignmentOption.then((input) =>
      input.addEventListener('sl-change', () => this._onAlignmentInput(input))
    )
    this.knitSideOption.then((input) =>
      input.checkbox.then((checkbox) =>
        checkbox.addEventListener('sl-change', () =>
          this._onKnitSideInput(checkbox)
        )
      )
    )
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._userSubscription.unsubscribe()
    this._optionsSubscription.unsubscribe()
    this._imageHeightSubscription.unsubscribe()
  }

  // Synchronize form to changes in User state

  private _userChange(user: User | null): void {
    const loggedIn = !!user
    if (!this._loggedIn && !loggedIn) {
      // User has not changed.
      return
    }
    if (this._loggedIn && loggedIn) {
      // User settings have changed.
      this._setMachine(user.settings)
      return
    }
    if (!this._loggedIn && loggedIn) {
      this._loggedIn = true
      // New user has logged in.
      this._setMachine(user.settings)
      return
    }
    if (this._loggedIn && !loggedIn) {
      this._loggedIn = false
      // User has logged out.
      this._setMachine(defaultSettings)
      return
    }
  }

  private _setMachine(settings: Settings): void {
    const machine: MachineEnum = (settings as any).machine
    this._machine = machine
  }

  private _machineText(machine: MachineEnum): string {
    switch (machine) {
      case MachineEnum.KH910_KH950i:
        return 'KH910, KH950i'

      case MachineEnum.KH900_KH930_KH940_KH965i:
        return 'KH930, KH940'

      case MachineEnum.KH270:
        return 'KH270'

      default:
        return ''
    }
  }

  // Synchronize form to changes in Options state

  private _optionsChange(options: fromOptions.State): void {
    if (this._options.mode !== options.mode) {
      this._options.mode = options.mode
      this.modeInput.then((mode) => {
        mode.select.then((select) => {
          select.value = `${options.mode as number}`
        })
      })
    }
    if (this._options.colors !== options.colors) {
      this._options.colors = options.colors
      this.modeInput.then((mode) => {
        mode.input.then((input) => {
          input.value = `${options.colors}`
        })
      })
    }
    if (this._options.startRow !== options.startRow) {
      this._options.startRow = options.startRow
      this.startRowOption.then((option) => {
        option.value = `${options.startRow}`
      })
    }
    if (this._options.infRepeat !== options.infRepeat) {
      this._options.infRepeat = options.infRepeat
      this.infRepeatOption.then((option) => {
        option.checked = options.infRepeat
      })
    }
    if (this._options.startNeedle !== options.startNeedle) {
      this._options.startNeedle = options.startNeedle
      this.startNeedleInput.then((needle) =>
        needle.input.then((input) => {
          input.value = `${options.startNeedle}`
        })
      )
    }
    if (this._options.startColor !== options.startColor) {
      this._options.startColor = options.startColor
      this.startNeedleInput.then((needle) => {
        needle.button.then((button) => {
          button.className = ColorEnum[options.startColor]
        })
        needle.icon.then((icon) => {
          icon.name = ColorHelper.iconName(ColorEnum[options.startColor])
        })
      })
    }
    if (this._options.stopNeedle !== options.stopNeedle) {
      this._options.stopNeedle = options.stopNeedle
      this.stopNeedleInput.then((needle) =>
        needle.input.then((input) => {
          input.value = `${options.stopNeedle}`
        })
      )
    }
    if (this._options.stopColor !== options.stopColor) {
      this._options.stopColor = options.stopColor
      this.stopNeedleInput.then((needle) => {
        needle.button.then((button) => {
          button.className = ColorEnum[options.stopColor]
        })
        needle.icon.then((icon) => {
          icon.name = ColorHelper.iconName(ColorEnum[options.stopColor])
        })
      })
    }
    if (this._options.alignment !== options.alignment) {
      this._options.alignment = options.alignment
      this.alignmentOption.then((option) => {
        option.value = `${options.alignment as number}`
      })
    }
    if (this._options.knitSide !== options.knitSide) {
      this._options.knitSide = options.knitSide
      this.knitSideOption.then((option) => {
        option.checked = options.knitSide
      })
    }
  }

  // Synchronize form to changes in image data

  private _imageHeightChange(imageHeight: number | undefined): void {
    if (this._imageHeight !== imageHeight) {
      this._imageHeight = imageHeight || 1
    }
  }

  // Input actions

  private _onModeInput(select: SlSelect): void {
    const value = parseInt(select.value as string) as ModeEnum
    OptionsFacade.setKnittingModeOption(value)
  }

  private _onColorsInput(input: SlInput): void {
    const value = parseInt(input.value)
    OptionsFacade.setColorsOption(value)
  }

  private _onStartRowInput(input: SlInput): void {
    const value = parseInt(input.value)
    OptionsFacade.setStartRowOption(value)
  }

  private _onInfRepeatInput(checkbox: SlCheckbox): void {
    OptionsFacade.setInfiniteRepeatOption(checkbox.checked)
  }

  private _onStartNeedleInput(input: SlInput): void {
    const value = parseInt(input.value)
    OptionsFacade.setStartNeedleOption(value)
  }

  private _onStartColorInput(button: SlButton): void {
    const color = ColorHelper.colorCode(button.className)
    OptionsFacade.setStartColorOption(color)
  }

  private _onStopNeedleInput(input: SlInput): void {
    const value = parseInt(input.value)
    OptionsFacade.setStopNeedleOption(value)
  }

  private _onStopColorInput(button: SlButton): void {
    const color = ColorHelper.colorCode(button.className)
    OptionsFacade.setStopColorOption(color)
  }

  private _onAlignmentInput(select: SlSelect): void {
    const value = parseInt(select.value as string) as AlignmentEnum
    OptionsFacade.setAlignmentOption(value)
  }

  private _onKnitSideInput(checkbox: SlCheckbox): void {
    OptionsFacade.setKnitSideOption(checkbox.checked)
  }

  // Render

  override render() {
    return html`
      <div class="margin"></div>
      <div
        class="flex-container"
        style="opacity: ${this.disabled ? 0.5 : 1};"
      >
        <div
          class="flex"
          style="margin-top: 0;"
        >
          Machine:
          <span id="machineOption">${this._machineText(this._machine)}</span>
        </div>
        <div class="flex">
          <mode-input
            id="modeInput"
            value=${(defaultSettings as any).mode}
            ?disabled=${this.disabled}
          ></mode-input>
        </div>
        <div class="flex">
          <sl-input
            id="startRowOption"
            name="startRow"
            label="Start row"
            type="number"
            value="1"
            min="1"
            max=${this._imageHeight}
            size="small"
            ?disabled=${this.disabled}
          ></sl-input>
        </div>
        <div class="flex">
          <sl-checkbox
            id="infRepeatOption"
            size="small"
            ?checked=${(defaultSettings as any).infRepeat}
            ?disabled=${this.disabled}
            >Infinite repeat</sl-checkbox
          >
        </div>
        <div class="flex">
          <needle-input
            id="startNeedleInput"
            name="start"
            label="Start needle"
            max=${Machine.needles(this._machine) / 2}
            ?disabled=${this.disabled}
          ></needle-input>
        </div>
        <div class="flex">
          <needle-input
            id="stopNeedleInput"
            name="stop"
            label="Stop needle"
            max=${Machine.needles(this._machine) / 2}
            ?disabled=${this.disabled}
          ></needle-input>
        </div>
        <div class="flex">
          <select-input
            name="alignment"
            label="Alignment"
            value=${(defaultSettings as any).alignment}
            enum=${JSON.stringify(EnumHelper.enumArray(AlignmentEnum))}
            size="small"
            style="--card-width: var(--options-width);"
            ?disabled=${this.disabled}
          ></select-input>
        </div>
        <knit-side-checkbox
          id="knitSideOption"
          ?checked=${(defaultSettings as any).knitSide}
          ?disabled=${this.disabled}
        ></knit-side-checkbox>
      </div>
    `
  }
}
