import { css } from "styled-components";

import { breakpointsPx } from "@/sizes";
import { cssLengthUsage, cssVarUsage } from "@utils";

import type { PaneStyleProps } from "./Pane.types";

export const paneContainerStyles = ({
  $expandedWidth,
  $collapsedWidth,
  $expandedBreakpoint,
  $headLess,
  $forceExpanded,
  $top,
  $bottom,
}: PaneStyleProps) => {
  const state = $forceExpanded ? "expanded" : "collapsed";
  return css`
    position: sticky;
    top: ${cssLengthUsage($top)};
    bottom: ${$bottom === "unset" ? "unset" : cssLengthUsage($bottom)};
    --pane-expanded-width: ${cssLengthUsage($expandedWidth)};
    --pane-collapsed-width: ${cssLengthUsage($collapsedWidth)};
    --pane-container-width: var(--pane-collapsed-width);
    --pane-content-padding: ${$headLess ? "0" : "var(--s-1)"};
    --pane-content-width: ${cssVarUsage(`pane-${state}-width`)};
    --pane-content-collapsed-box-shadow: var(--shadow-card-default);
    --pane-content-expanded-box-shadow: var(--shadow-card-elevation-high);
    --pane-content-box-shadow: ${cssVarUsage(
      `pane-content-${state}-box-shadow`
    )};

    width: var(--pane-container-width);
    height: var(--pane-container-height);
    max-height: 100%;
    max-width: var(--pane-container-width);
    min-width: var(--pane-container-width);
    transition-property: width, min-width, max-width;

    transition-duration: 300ms;
    transition-timing-function: var(--bezier);
    ${$expandedBreakpoint &&
    $expandedBreakpoint in breakpointsPx &&
    css`
      @media only screen and (min-width: ${breakpointsPx[
          $expandedBreakpoint
        ]}) {
        --pane-container-width: var(--pane-expanded-width);
        --pane-content-width: var(--pane-expanded-width);
      }
    `}

    &:hover {
      --pane-content-width: var(--pane-expanded-width);
      --pane-content-box-shadow: var(--pane-content-expanded-box-shadow);
    }
  `;
};

export const paneContentStyles = ({
  $anchor,
  $headLess,
}: PaneStyleProps) => css`
  position: absolute;

  top: 0;
  ${$anchor}: 0;
  min-height: fit-content;
  max-height: 100%;
  width: var(--pane-content-width);
  max-width: var(--pane-expanded-width);
  min-width: var(--pane-collapsed-width);
  transition:
    width 300ms var(--bezier),
    box-shadow 150ms var(--bezier),
    padding 150ms var(--bezier);
  overflow: hidden;

  ${!$headLess &&
  css`
    background: var(--white);
    border-radius: var(--s-2);
    box-shadow: var(--pane-content-box-shadow);
    padding: var(--pane-content-padding);
  `}
`;
