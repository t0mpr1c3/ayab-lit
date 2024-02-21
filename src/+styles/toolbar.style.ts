import { css } from 'lit'

export const toolbarStyle = css`
  sl-button.upload {
    width: 109px; /* hack to get label to span entire width of button */
  }
  label.upload {
    cursor: pointer;
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0 1rem;
    left: -1rem;
  }
  .toolbar {
    background-color: var(--color-background-paper);
    color: var(--color-text-primary);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 4rem;
    padding: 0 0.75rem;
    position: relative;
    width: 100%;
    z-index: 0; /* behind minifabs */
  }
  .menubar {
    display: flex;
    margin-top: 0.875rem;
  }
  .banner {
    font-family: var(--font-banner);
    font-size: xx-large;
    position: relative;
    top: -0.375rem;
  }
  .logo {
    left: -9.75rem;
    margin-left: 8rem;
    position: relative;
    top: -1.5rem;
    transform: scale(0.1);
    width: 0;
  }
  .space {
    width: 1rem;
  }
  .gap {
    width: 2px;
  }
  sl-alert::part(base) {
    background-color: var(--sl-color-gray-800);
    border-radius: var(--sl-border-radius-large);
    color: var(--sl-color-warning-500);
    font-family: var(--sl-font-sans);
    font-size: large;
    width: 20vw;
    z-index: 200; /* on top of minifab buttons */
  }
  sl-alert::part(icon) {
    color: var(--color-secondary);
    size: large;
  }
`
