import { css } from 'lit'

export const dialogStyle = css`
  sl-dialog {
    font-family: var(--sl-font-sans);
    border-radius: var(--sl-border-radius-large);
  }
  sl-dialog p {
    font-size: var(--sl-font-size-small);
  }
  sl-dialog::part(panel) {
    border-radius: var(--sl-border-radius-large);
  }
  sl-dialog::part(body) {
    border-radius: var(--sl-border-radius-large);
  }
  sl-icon {
    opacity: 0.8;
  }
  sl-icon.grey {
    opacity: 0.3;
  }
  .block {
    display: block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .dialog-container {
    padding: 1rem;
  }
  .dialog-block {
    margin: 0;
  }
  .bar {
    display: flex;
    flex-wrap: row wrap;
    justify-content: space-between;
    align-items: flex-end;
  }
  .card-header {
    background-color: var(--color-overlay);
    border-bottom: 1px solid var(--color-overlay-darker);
    font-size: 1.25rem;
    font-weight: 400;
    max-width: calc(var(--card-width) + 2rem);
    padding: 1rem;
  }
  .card-body {
    margin: auto;
    max-width: calc(var(--card-width) + 2rem);
    padding: 1rem;
  }
  .wide {
    width: 100%;
  }
  .grey {
    opacity: 0.38;
  }
  .flex-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: -0.5;
  }
  .flex {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`
