import { css } from 'lit'

export const appStyle = css`
  canvas {
    margin-left: auto;
    margin-right: auto;
    display: block;
    cursor: ns-resize;
  }
  .container {
    display: flex;
    flex-direction: column;
    overflow-x: clip;
    overflow-y: visible;
  }
  .container,
  .grid {
    background-color: var(--color-background-paper);
    height: 100vh;
    width: 100%;
  }
  .grid {
    display: grid;
    flex: 1 0 24rem;
    grid-template-columns: auto min-content;
    grid-column-gap: 0rem;
    padding: 0rem 0.75rem 0.75rem 0.75rem;
  }
  .canvas {
    border: solid 1px var(--color-background-border);
    border-radius: var(--sl-border-radius-large);
    background-color: var(--color-background);
    padding: 0.75rem;
  }
  .options {
    color: var(--color-text-secondary);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-button-font-size-medium);
    position: relative;
    width: var(--options-width);
  }
  div.top {
    height: 0;
  }
  div.shown {
    padding-left: 0.75em;
    padding-right: 2em;
    /*
    overflow-x: visible;
    overflow-y: clip;
    */
  }
  div.hidden {
    width: 1.5rem;
    padding: 0;
  }
`
