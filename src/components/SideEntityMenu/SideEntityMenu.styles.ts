import { css } from "styled-components";

import { cssVarUsage } from "@utils";

const sideEntityMenuStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  /* height: 100%; */
  /* overflow: hidden; */
  /* padding: 0.25rem; */
  /* background-color: var(--white); */
  /* border-radius: 0.5rem; */
`;

export const sideEntityMenuContainerStyles = css`
  ${sideEntityMenuStyles}/* width: 100%; */
  /* transition: width 0.2s ease-in-out; */

  /* Show all when hovering the entire menu */
  /* &:hover {
    div[data-text-content] {
      opacity: 1;
      visibility: visible;
    } */

    /* Hide error indicator on icon when expanded
    div[data-error-indicator] {
      opacity: 0;
      visibility: hidden;
    } */
  /* } */
`;

export const sideEntityMenuTitleSectionStyles = css`
  display: flex;
  align-items: center;
  height: 2.5rem;
  gap: 0.75rem;
  padding: ${cssVarUsage("s-2")};
`;

export const menuItemStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 2.5rem;
  cursor: pointer;
  text-decoration: none;
  background: var(--primary-light-00);
  transition: background-color 0.2s ease;

  border-radius: var(--s-1);

  &:hover:not([aria-disabled="true"], :disabled, [data-menu-header]) {
    background: var(--primary-light);
  }

  &[data-menu-header] {
    cursor: default;
  }

  &:disabled:not([data-menu-header]),
  &[aria-disabled="true"]:not([data-menu-header]) {
    cursor: not-allowed;
  }

  &[aria-current="page"] {
    font-weight: 600;
  }
`;

export const menuItemIconStyles = css`
  /* flex-shrink: 0; */
  display: flex;
  /* align-items: center; */
  justify-content: center;
  /* height: 1.25rem; */
  /* width: 1rem; */
  padding: var(--s-3) var(--s-2);
  width: calc(var(--pane-collapsed-width) - var(--pane-content-padding) * 2);
  min-width: calc(
    var(--pane-collapsed-width) - var(--pane-content-padding) * 2
  );
  max-width: calc(
    var(--pane-collapsed-width) - var(--pane-content-padding) * 2
  );

  /* outline: 1px solid red; */
  /* outline-offset: -1px; */

  position: relative;
  svg,
  path {
    transition: fill 150ms var(--bezier);
  }
`;

export const menuItemErrorIndicatorStyles = css`
  position: absolute;
  top: calc(50% - var(--s-2));
  translate: 50% -50%;
  right: calc(50% - var(--s-2));
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--s-2);
  height: var(--s-2);
  visibility: visible;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  [data-expanded="true"] & {
    opacity: 0;
    visibility: hidden;
  }
`;

export const menuItemTitleStyles = css`
  display: flex;
  align-items: center;
  gap: var(--s-3);
  max-height: 100%;
  opacity: 0;
  transition: opacity 0.2s ease;
  width: calc(var(--pane-expanded-width) - var(--pane-collapsed-width));
  min-width: calc(var(--pane-expanded-width) - var(--pane-collapsed-width));
  max-width: calc(var(--pane-expanded-width) - var(--pane-collapsed-width));

  /* outline: 1px solid blue;
  outline-offset: -1px; */
  padding-right: var(--s-2);

  [data-expanded="true"] & {
    opacity: 1;
    /* visibility: visible; */
  }
`;

export const menuItemPinIconStyles = css`
  opacity: 0;
  /* visibility: hidden; */
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  /* &:not([data-text-content]) {
    opacity: 1;
    visibility: visible;
  } */

  [data-expanded="true"] & {
    opacity: 1;
    /* visibility: visible; */
  }
`;

export const menuItemErrorIconStyles = css`
  opacity: 0;
  /* visibility: hidden; */
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;

  &:not([data-text-content]) {
    opacity: 1;
    visibility: visible;
  }

  [data-expanded="true"] & {
    opacity: 1;
    /* visibility: visible; */
  }
`;

export const menuItemIndicatorStyles = css`
  position: absolute;
  left: 0;
  height: 1.25rem;
  width: var(--s-05);
  border-radius: var(--s-05);
  background-color: ${cssVarUsage("primary-base")};
  align-self: center;
`;

export const menuItemTextContentStyles = css`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  > * {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1;
  }
`;

export const menuItemIconTextContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
`;
