import { css, type RuleSet } from "styled-components";

import { IconFallbackStyleProps } from "./Icon.types";

export const iconFallbackStyles = ({
  $size,
}: IconFallbackStyleProps): RuleSet => css`
  min-width: ${$size};
  max-width: ${$size};
  width: ${$size};
  min-height: ${$size};
  max-height: ${$size};
  height: ${$size};
  opacity: 0;
  pointer-events: none;
  background: none;
  color: none;
`;
