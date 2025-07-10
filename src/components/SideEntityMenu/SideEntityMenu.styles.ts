import { css } from "styled-components";

import { breakpointsPx } from "@/sizes";

import type { PaneProps } from "@layouts";
import type { StyleProps } from "@types";

export const sideEntityMenuContainerStyles = ({
  $expandedBreakpoint,
}: StyleProps<Pick<PaneProps, "expandedBreakpoint">>) => css`
  display: flex;
  flex-direction: column;
  gap: var(--s-1);

  ${$expandedBreakpoint &&
  $expandedBreakpoint in breakpointsPx &&
  css`
    @media only screen and (min-width: ${breakpointsPx[$expandedBreakpoint]}) {
      background: var(--white-00);
      box-shadow: none;
      padding: var(--pane-content-padding) 0;
    }
  `}
`;

export const menuItemStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 2.5rem;
  cursor: pointer;
  text-decoration: none;
  background: var(--primary-light-00);
  transition: background 300ms var(--bezier);

  border-radius: var(--s-1);

  &[data-border-bottom="true"] {
    border-bottom: 1px solid var(--gray-200);
    border-radius: var(--s-1) var(--s-1) 0 0;
  }

  &:hover:not([aria-disabled="true"], :disabled, [data-menu-header]) {
    background: var(--primary-light);
    transition-duration: 150ms var(--bezier);
  }

  &[data-menu-header] {
    cursor: default;
  }

  &:disabled:not([data-menu-header]),
  &[aria-disabled="true"]:not([data-menu-header]) {
    cursor: not-allowed;
  }
`;

export const menuItemIconStyles = css`
  display: flex;
  justify-content: center;
  padding: var(--s-3) var(--s-2);
  width: calc(var(--pane-collapsed-width) - var(--pane-content-padding) * 2);
  min-width: calc(
    var(--pane-collapsed-width) - var(--pane-content-padding) * 2
  );
  max-width: calc(
    var(--pane-collapsed-width) - var(--pane-content-padding) * 2
  );
  position: relative;

  svg,
  path {
    transition: fill 300ms var(--bezier);
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
  transition:
    opacity 300ms var(--bezier),
    visibility 300ms var(--bezier);

  [data-expanded="true"] & {
    opacity: 0;
    transition:
      opacity 150ms var(--bezier),
      visibility 150ms var(--bezier);
  }
`;

export const menuItemTitleStyles = css`
  display: flex;
  align-items: center;
  gap: var(--s-3);
  max-height: 100%;
  opacity: 0;
  transition: opacity 300ms var(--bezier);
  width: calc(var(--pane-expanded-width) - var(--pane-collapsed-width));
  min-width: calc(var(--pane-expanded-width) - var(--pane-collapsed-width));
  max-width: calc(var(--pane-expanded-width) - var(--pane-collapsed-width));

  padding-right: var(--s-2);

  [data-expanded="true"] & {
    opacity: 1;
    transition: opacity 150ms var(--bezier);
  }
`;

export const menuItemIndicatorStyles = css`
  position: absolute;
  left: 0;
  height: 1.25rem;
  width: var(--s-05);
  border-radius: var(--s-05);
  background: var(--primary-base);
  align-self: center;
`;
