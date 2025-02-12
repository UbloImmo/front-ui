import { css } from "styled-components";

import { breakpointsPx } from "@/sizes";

export const phoneInputContainerStyles = css`
  max-width: 100%;
  width: 100%;
  // needed not to break layout when used inside a flex container
  display: flex;
  &:has(
      input[data-testid="input-phone"]:focus,
      button.react-international-phone-country-selector-button--active
    ) {
    z-index: 1; // used to make sure whole input & country selector dropdown is visible when active
  }
`;

export const phoneInputStyles = css`
  padding-left: var(--s-14);
  position: relative;
  min-width: unset;
  max-width: 100%;
  width: 100%;
`;

/**
 * copied from react-international-phone/dist/index.css
 */
export const reactInternalPhoneStyle = css`
  .react-international-phone-country-selector {
    --react-international-phone-country-selector-arrow-color: var(
      --control-color
    );
    --react-international-phone-country-selector-arrow-size: calc(
      var(--s-1) * 1.5
    );

    position: static;
    pointer-events: all;
    height: 100%;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  &,
  & * {
    scrollbar-width: 0;
  }

  .react-international-phone-country-selector-button {
    --button-offset: var(--s-05);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    margin: 0;
    appearance: button;
    -webkit-appearance: button;
    cursor: pointer;
    text-transform: none;
    user-select: none;
    height: calc(100% - (var(--button-offset) * 2));
    transform: translate(var(--button-offset), var(--button-offset));
    border-radius: var(--s-05);
    padding: 0;
    padding-left: var(--s-1);
    position: absolute;
    z-index: 1;
    border: none;
    background: var(--gray-50-00);

    transition: background 300ms ease-out 0s;

    &:hover:not(&--disabled) {
      background: var(--gray-50);
      --control-color: var(--primary-base);
      transition-duration: 150ms;
    }
  }
  .react-international-phone-country-selector-button--hide-dropdown {
    cursor: auto;
  }

  .react-international-phone-country-selector-button__button-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-international-phone-country-selector-button__flag-emoji {
    margin: 0 var(--s-1);
  }
  .react-international-phone-country-selector-button__flag-emoji--disabled {
    opacity: 0.75;
  }
  .react-international-phone-country-selector-button__dropdown-arrow {
    border-top: var(
        --react-international-phone-country-selector-arrow-size,
        4px
      )
      solid var(--control-color);
    border-right: var(
        --react-international-phone-country-selector-arrow-size,
        4px
      )
      solid transparent;
    border-left: var(
        --react-international-phone-country-selector-arrow-size,
        4px
      )
      solid transparent;
    margin-right: var(--s-1);
    transition: all 150ms ease-out;
  }
  .react-international-phone-country-selector-button__dropdown-arrow--active {
    transform: rotateX(180deg);
  }
  .react-international-phone-flag-emoji {
    width: var(--s-6);
    height: var(--s-6);
  }
  .react-international-phone-country-selector-dropdown {
    position: absolute;
    top: var(--s-7);
    left: 0;
    display: flex;
    width: 100%;
    max-height: 12rem;
    z-index: unset;
    flex-direction: column;
    padding: 0;
    padding-top: var(--s-1);
    margin: 0;
    background: var(--white);
    box-shadow: var(--shadow-card-elevation-low);
    color: var(--gray-800);
    list-style: none;
    overflow-y: scroll;
    border-radius: 0 0 var(--s-2) var(--s-2);

    &:focus-visible {
      outline: none;
    }

    @media only screen and (max-width: ${breakpointsPx.XS}) {
      top: var(--s-9);
    }
  }
  .react-international-phone-country-selector-dropdown__preferred-list-divider {
    height: 1px;
    border: none;
    background: var(--gray-50);
  }
  .react-international-phone-country-selector-dropdown__list-item {
    display: flex;
    min-height: var(--react-international-phone-dropdown-item-height, 28px);
    box-sizing: border-box;
    align-items: center;
    background: var(--white);
    transition: background 150ms ease-out 0s;
    padding: var(--s-2);
    gap: var(--s-2);

    * {
      margin: 0;
    }
  }
  .react-international-phone-country-selector-dropdown__list-item-country-name {
    overflow: hidden;
    color: var(--gray-700);
    font-size: var(--text-m);
    font-weight: var(--text-weight-medium);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .react-international-phone-country-selector-dropdown__list-item--selected
    .react-international-phone-country-selector-dropdown__list-item-country-name,
  .react-international-phone-country-selector-dropdown__list-item--focused
    .react-international-phone-country-selector-dropdown__list-item-country-name,
  .react-international-phone-country-selector-dropdown__list-item:hover
    .react-international-phone-country-selector-dropdown__list-item-country-name {
    color: var(--gray-800);
  }
  .react-international-phone-country-selector-dropdown__list-item:hover {
    background-color: var(--gray-50);
    cursor: pointer;
  }
  .react-international-phone-country-selector-dropdown__list-item--selected,
  .react-international-phone-country-selector-dropdown__list-item--focused {
    background-color: var(--primary-light);
    color: var(--primary-dark);
  }
  .react-international-phone-country-selector-dropdown__list-item--selected
    .react-international-phone-country-selector-dropdown__list-item-dial-code,
  .react-international-phone-country-selector-dropdown__list-item--focused
    .react-international-phone-country-selector-dropdown__list-item-dial-code {
    color: var(--gray-600);
    font-weight: var(--text-weight-regular);
  }
  .react-international-phone-country-selector-dropdown__list-item--focused {
    background-color: var(--primary-light);
  }
`;
