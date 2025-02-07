import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `hexagon-dashed`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const HexagonDashed = (props: CommonIconProps): JSX.Element => {
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
        d="M7.24296 0.363411C7.71062 0.0900044 8.28938 0.0900038 8.75704 0.36341L9.44454 0.765333L8.93985 1.62863L8.25235 1.22671C8.09646 1.13557 7.90354 1.13557 7.74765 1.22671L7.06015 1.62863L6.55546 0.765334L7.24296 0.363411Z"
        fill={color}
      />
      <path
        d="M10.8195 1.56918L12.1945 2.37303L11.6898 3.23632L10.3148 2.43248L10.8195 1.56918Z"
        fill={color}
      />
      <path
        d="M3.80545 2.37303L5.18046 1.56918L5.68515 2.43248L4.31015 3.23632L3.80545 2.37303Z"
        fill={color}
      />
      <path
        d="M1.74295 3.5788L2.43045 3.17687L2.93515 4.04017L2.24765 4.44209C2.09428 4.53176 2 4.69608 2 4.87374V5.65531H1V4.87374C1 4.34075 1.28283 3.84779 1.74295 3.5788Z"
        fill={color}
      />
      <path
        d="M13.5695 3.17687L14.257 3.5788C14.7172 3.84779 15 4.34075 15 4.87374V5.65531H14V4.87374C14 4.69608 13.9057 4.53176 13.7523 4.44209L13.0648 4.04017L13.5695 3.17687Z"
        fill={color}
      />
      <path d="M1 8.78157V7.21844H2V8.78157H1Z" fill={color} />
      <path d="M15 7.21844V8.78157H14V7.21844H15Z" fill={color} />
      <path
        d="M1 11.1263V10.3447H2V11.1263C2 11.3039 2.09428 11.4683 2.24765 11.5579L2.93515 11.9598L2.43046 12.8231L1.74296 12.4212C1.28283 12.1522 1 11.6593 1 11.1263Z"
        fill={color}
      />
      <path
        d="M15 10.3447V11.1263C15 11.6593 14.7172 12.1522 14.257 12.4212L13.5695 12.8231L13.0648 11.9598L13.7523 11.5579C13.9057 11.4683 14 11.3039 14 11.1263V10.3447H15Z"
        fill={color}
      />
      <path
        d="M12.1945 13.627L10.8195 14.4308L10.3148 13.5675L11.6898 12.7637L12.1945 13.627Z"
        fill={color}
      />
      <path
        d="M5.18046 14.4308L3.80546 13.627L4.31015 12.7637L5.68515 13.5675L5.18046 14.4308Z"
        fill={color}
      />
      <path
        d="M7.24296 15.6366L6.55546 15.2347L7.06015 14.3714L7.74765 14.7733C7.90354 14.8644 8.09646 14.8644 8.25235 14.7733L8.93985 14.3714L9.44454 15.2347L8.75704 15.6366C8.28938 15.91 7.71062 15.91 7.24296 15.6366Z"
        fill={color}
      />
    </svg>
  );
};
