import { css } from 'lit'

export const buttonStyle = css`
  sl-button::part(base) {
    -webkit-box-shadow: var(--sl-button-base-box-shadow);
    -moz-box-shadow: var(--sl-button-base-box-shadow);
    box-shadow: var(--sl-button-base-box-shadow);
  }
  sl-button::part(base):hover {
    -webkit-box-shadow: var(--sl-button-base-box-shadow-hover);
    -moz-box-shadow: var(--sl-button-base-box-shadow-hover);
    box-shadow: var(--sl-button-base-box-shadow-hover);
  }
  sl-button::part(base):active {
    -webkit-box-shadow: var(--sl-button-base-box-shadow-active);
    -moz-box-shadow: var(--sl-button-base-box-shadow-active);
    box-shadow: var(--sl-button-base-box-shadow-active);
  }
  sl-button::part(base):disabled {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  sl-button.solid::part(base) {
    background-color: var(--sl-button-solid-base-background);
    border-color: var(--sl-button-solid-base-background);
    color: var(--sl-button-solid-base-color);
    letter-spacing: var(--sl-button-solid-base-letter-spacing);
  }
  sl-button.solid::part(base):hover {
    background-color: var(--sl-button-solid-base-background-hover);
    border-color: var(--sl-button-solid-base-background-hover);
  }
  sl-button.solid::part(base):active {
    background-color: var(--sl-button-solid-base-background-active);
    border-color: var(--sl-button-solid-base-background-active);
  }
  sl-button.solid::part(base):disabled {
    background-color: var(--sl-button-solid-base-background-disabled);
    border-color: var(--sl-button-solid-base-background-disabled);
    color: var(--sl-button-solid-base-color-disabled);
  }

  sl-button.paper::part(base) {
    color: var(--sl-button-menu-base-color);
    background-color: var(--color-background-paper);
    border-color: var(--color-background-paper);
  }
  sl-button.paper::part(base):hover {
    background-color: var(--sl-button-menu-base-hover-background);
    border-color: var(--sl-button-menu-base-hover-border-color);
  }
  sl-button.paper::part(base):active {
    background-color: var(--sl-button-menu-base-active-background);
    border-color: var(--sl-button-menu-base-active-border-color);
  }

  sl-button.minifab::part(base) {
    position: relative;
    top: calc(var(--sl-input-height-small) * -0.5);
    left: calc(var(--sl-input-height-small) * -0.5);
    z-index: 100; /* on top of toolbar */
  }

  sl-button.select::part(base) {
    color: var(--sl-button-menu-base-color);
    background-color: var(--color-background);
    border-color: var(--color-background-border);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  sl-button.select::part(base):hover {
    color: var(--sl-button-menu-base-color);
    background-color: var(--color-background);
    border-color: var(--color-background-border);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  button:disabled {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    color: var(--sl-input-color-disabled);
    cursor: not-allowed;
  }
`
