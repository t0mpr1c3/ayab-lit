import { css } from 'lit'

export const inputStyle = css`
  /*
  sl-input::part(base) {
    border: solid 1px var(--color-background);
    -webkit-box-shadow: var(--sl-button-menu-base-box-shadow);
    -moz-box-shadow: var(--sl-button-menu-base-box-shadow);
    box-shadow: var(--sl-button-menu-base-box-shadow);
  }
  sl-input::part(base):hover {
    -webkit-box-shadow: var(--sl-button-menu-base-hover-box-shadow);
    -moz-box-shadow: var(--sl-button-menu-base-hover-box-shadow);
    box-shadow: var(--sl-button-menu-base-hover-box-shadow);
  }
  sl-input::part(base):active {
    -webkit-box-shadow: var(--sl-button-menu-base-active-box-shadow);
    -moz-box-shadow: var(--sl-button-menu-base-active-box-shadow);
    box-shadow: var(--sl-button-menu-base-active-box-shadow);
  }
  */
  sl-input::part(input) {
    font-family: var(--sl-font-sans);
    /* font-size: var(--sl-input-font-size-small); */
  }
  sl-input::part(form-control-input) {
    border: solid 1px var(--color-background-border);
    border-radius: var(--sl-border-radius-medium);
    color: var(--color-text-secondary);
    font-family: var(--sl-font-sans);
    /* font-size: var(--sl-font-size-x-small); */
  }
  sl-input::part(form-control-input):disabled {
    background-color: var(--color-background-paper-light);
  }
  /*
  sl-input:disabled {
    opacity: 0.5;
  }
  */
`
