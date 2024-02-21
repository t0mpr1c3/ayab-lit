import { css } from 'lit'

export const menuStyle = css`
  sl-button.menu::part(base) {
    color: var(--sl-button-menu-base-color);
    letter-spacing: var(--sl-button-menu-base-letter-spacing);
    -webkit-box-shadow: var(--sl-button-menu-base-box-shadow);
    -moz-box-shadow: var(--sl-button-menu-base-box-shadow);
    box-shadow: var(--sl-button-menu-base-box-shadow);
  }
  sl-button.menu::part(base):hover {
    -webkit-box-shadow: var(--sl-button-menu-base-hover-box-shadow);
    -moz-box-shadow: var(--sl-button-menu-base-hover-box-shadow);
    box-shadow: var(--sl-button-menu-base-hover-box-shadow);
  }
  sl-button.menu::part(base):active {
    -webkit-box-shadow: var(--sl-button-menu-base-active-box-shadow);
    -moz-box-shadow: var(--sl-button-menu-base-active-box-shadow);
    box-shadow: var(--sl-button-menu-base-active-box-shadow);
  }
  sl-button.menu::part(base):disabled {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    color: var(--sl-button-menu-base-color);
  }
  sl-menu {
    padding: var(--sl-menu-padding);
  }
  sl-menu-item::part(label) {
    color: var(--sl-menu-item-label-color);
    font-size: var(--sl-menu-item-label-font-size);
  }
  sl-menu-item::part(base):hover {
    background-color: var(--sl-menu-item-base-background-hover);
    color: var(--sl-menu-item-label-color);
  }
  sl-menu-item::part(base):active {
    background-color: var(--sl-menu-item-base-background-active);
    color: var(--sl-menu-item-label-color);
  }
  sl-menu-item::part(checked-icon) {
    width: var(--sl-menu-item-checked-icon-width);
  }
  sl-menu-item::part(suffix) {
    width: var(--sl-menu-item-suffix-width);
  }
  sl-menu-item::part(submenu-icon) {
    width: var(--sl-menu-item-submenu-icon);
  }
`