import { ValueMap } from "@ubloimmo/front-util";
import { RuleSet, css } from "styled-components";

import { isAvatarPropsCount } from "./Avatar.utils";

import { cssPxToCssRem, cssVarUsage, fromStyleProps } from "@utils";

import type { AvatarDefaultProps, AvatarSize } from "./Avatar.types";
import type { CssPx, StyleProps, CssLength } from "@types";

const avatarSizeMap: ValueMap<AvatarSize, CssPx> = {
  m: "28px",
  l: "44px",
  xl: "120px",
};

const avatarBorderRadiusMap: ValueMap<AvatarSize, CssPx> = {
  m: "4px",
  l: "8px",
  xl: "24px",
};

export const avatarStyles = (
  styleProps: StyleProps<AvatarDefaultProps>
): RuleSet => {
  const props = fromStyleProps(styleProps);

  const containerSizePx = avatarSizeMap[props.size];

  const containerSize = cssPxToCssRem(containerSizePx);

  const borderRadius: CssLength = props.organization
    ? cssPxToCssRem(avatarBorderRadiusMap[props.size])
    : "50%";

  const isCount = isAvatarPropsCount(props);

  return css`
    border-radius: ${borderRadius};
    overflow: hidden;
    min-width: ${containerSize};
    width: ${containerSize};
    max-width: ${containerSize};
    min-height: ${containerSize};
    height: ${containerSize};
    max-height: ${containerSize};
    background-color: ${isCount
      ? cssVarUsage("gray-50")
      : cssVarUsage("primary-light")};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    img[data-testid="avatar-image"] {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;
};
