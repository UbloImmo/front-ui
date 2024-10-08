import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `diamond-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const DiamondOff = (props: CommonIconProps): JSX.Element => {
  const { color, size } = useMemo(() => {
    const mergedProps = mergeDefaultProps(commonIconDefaulProps, props);
    return {
      color: cssVarUsage(mergedProps.color),
      size: cssLengthUsage(mergedProps.size),
    };
  }, [props]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon"
    >
      <path
        d="M6.95059 0.434678C7.53017 -0.144894 8.46984 -0.144892 9.04941 0.434679L15.5653 6.95059C16.1449 7.53017 16.1449 8.46984 15.5653 9.04941L13.368 11.2467L12.6684 10.5471L14.8657 8.3498C15.0589 8.15661 15.0589 7.84339 14.8657 7.6502L8.3498 1.13428C8.15661 0.941093 7.84339 0.941093 7.6502 1.13428L5.4529 3.33158L4.7533 2.63198L6.95059 0.434678Z"
        fill={color}
      />
      <path
        d="M1.85355 1.14645C1.65829 0.951184 1.34171 0.951184 1.14645 1.14645C0.951184 1.34171 0.951184 1.65829 1.14645 1.85355L14.1464 14.8536C14.3417 15.0488 14.6583 15.0488 14.8536 14.8536C15.0488 14.6583 15.0488 14.3417 14.8536 14.1464L1.85355 1.14645Z"
        fill={color}
      />
      <path
        d="M2.63198 4.7533L3.33158 5.4529L1.13428 7.6502C0.941093 7.84339 0.941093 8.15661 1.13428 8.3498L7.6502 14.8657C7.84339 15.0589 8.15661 15.0589 8.3498 14.8657L10.5471 12.6684L11.2467 13.368L9.04941 15.5653C8.46983 16.1449 7.53016 16.1449 6.95059 15.5653L0.434678 9.04941C-0.144894 8.46983 -0.144892 7.53016 0.434679 6.95059L2.63198 4.7533Z"
        fill={color}
      />
    </svg>
  );
};
