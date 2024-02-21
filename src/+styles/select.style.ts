import { css } from 'lit'

export const selectStyle = css`
  sl-select::part(form-control-input) {
    border: solid 1px var(--color-background-border);
    border-radius: var(--sl-border-radius-medium);
  }
  sl-select::part(form-control-input):disabled {
    background-color: var(--color-background-paper-light);
  }
  sl-select:disabled {
    opacity: 0.5;
  }
`
