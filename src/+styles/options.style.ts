import { css } from 'lit'

export const optionsStyle = css`
  sl-input {
    width: var(--options-width);
  }
  sl-input::part(input) {
    width: var(--options-width);
  }
  .margin {
    height: 0.625rem;
  }
  .flex-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: -0.5;
  }
  .flex {
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
  }
  .bar {
    display: flex;
    flex-wrap: row wrap;
    justify-content: space-between;
    align-items: flex-end;
  }
  .knit-side-icon {
    width: 18px;
    height: 18px;
    position: relative;
    bottom: -5px;
  }

  // ModeInput
  .mode {
    display: flex;
    justify-content: space-between;
    margin-left: -0.5rem;
    width: calc(var(--options-width) - 3rem);
  }
  sl-button.dropdown::part(base):disabled {
    background-color: var(--color-background);
  }

  // NeedleInput
  sl-input::part(base) {
    overflow: visible;
    z-index: 100;
  }
  /*
  sl-button::part(base) {
    position: relative;
    z-index: 100;
  }
  */
  sl-button.orange::part(base) {
    border-color: var(--color-orange);
    color: var(--color-green-darker);
    background-color: var(--color-orange);
  }
  sl-button.orange::part(base):hover {
    border-color: var(--color-orange-dark);
    background-color: var(--color-orange-dark);
  }
  sl-button.orange::part(base):active {
    border-color: var(--color-orange-darker);
    background-color: var(--color-orange-darker);
  }
  sl-button.green::part(base) {
    border-color: var(--color-green);
    color: var(--color-orange);
    background-color: var(--color-green);
  }
  sl-button.green::part(base):hover {
    border-color: var(--color-green-dark);
    background-color: var(--color-green-dark);
  }
  sl-button.green::part(base):active {
    border-color: var(--color-green-darker);
    background-color: var(--color-green-darker);
  }
`
