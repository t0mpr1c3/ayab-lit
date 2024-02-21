import { css } from 'lit'

export const checkboxStyle = css`
  sl-checkbox::part(base):disabled {
    opacity: 1;
  }
  sl-checkbox::part(label) {
    font-family: var(--sl-font-sans);
    //font-size: var(--sl-font-size-small);
  }
  sl-checkbox::part(checked-icon) {
    color: var(--color-text-contrast);
  }
  sl-checkbox::part(control) {
    background-color: var(--color-background);
    border: solid 2px var(--color-text-secondary);
    /* fake a border around checkbox */
    -webkit-box-shadow: var(--sl-checkbox-box-shadow);
    -moz-box-shadow: var(--sl-checkbox-box-shadow);
    box-shadow: var(--sl-checkbox-box-shadow);
    border-radius: calc(2 * var(--sl-checkbox-border-width));
    width: calc(1rem - var(--sl-checkbox-border-width));
    height: calc(1rem - var(--sl-checkbox-border-width));
    position: relative;
    left: var(--sl-checkbox-border-width);
    top: 0;
    margin-top: calc(2 * var(--sl-checkbox-border-width));
    margin-right: calc(2 * var(--sl-checkbox-border-width));
    /* end of fake border hack */
  }
  /*
  sl-checkbox::part(control):hover {
    -webkit-box-shadow: var(--sl-checkbox-box-shadow-hover);
    -moz-box-shadow: var(--sl-checkbox-box-shadow-hover);
    box-shadow: var(--sl-checkbox-box-shadow-hover);
  }
  */
  sl-checkbox::part(control--checked) {
    background-color: var(--color-primary);
    /* remove fake border */
    box-shadow: none;
    border-radius: calc(3 * var(--sl-checkbox-border-width));
    width: calc(1rem + var(--sl-checkbox-border-width));
    height: calc(1rem + var(--sl-checkbox-border-width));
    left: 0;
    top: var(--sl-checkbox-border-width);
    margin-top: 0;
    margin-right: 0;
    /* end of fake border hack */
  }
  sl-checkbox::part(control--checked):hover {
    -webkit-box-shadow-hover: none;
    -moz-box-shadow-hover: none;
    box-shadow: none;
  }
`
