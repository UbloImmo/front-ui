import { ValueMap } from "@ubloimmo/front-util";
import { RuleSet, css } from "styled-components";

import { AvatarDefaultProps, AvatarSize } from "./Avatar.types";
import { isAvatarPropsCount } from "./Avatar.utils";

import { CssPx, StyleProps } from "@types";
import { cssPxToCssRem, cssVarUsage, fromStyleProps } from "@utils";

const avatarSizeMap: ValueMap<AvatarSize, CssPx> = {
  m: "28px",
  xl: "120px",
};

export const avatarStyles = (
  props: StyleProps<AvatarDefaultProps>
): RuleSet => {
  const mergedProps = fromStyleProps(props);

  const containerSizePx = avatarSizeMap[mergedProps.size];

  const containerSize = cssPxToCssRem(containerSizePx);

  const isCount = isAvatarPropsCount(mergedProps);

  return css`
    border-radius: 50%;
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
