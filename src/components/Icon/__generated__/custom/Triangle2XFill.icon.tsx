import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-x-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2XFill = (props: CommonIconProps): JSX.Element => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.16068 0C9.36415 0 9.54796 0.12399 9.62454 0.3125L15.7183 15.3125C15.8513 15.6411 15.6091 16 15.2544 16H0.740753C0.386322 15.9998 0.14405 15.641 0.276886 15.3125L6.37064 0.3125C6.44718 0.124088 6.63116 0.000129184 6.8345 0H9.16068ZM10.6812 8.05762C10.4372 7.81423 10.0413 7.81415 9.79739 8.05762L8.2388 9.61523L6.68021 8.05762C6.43608 7.81441 6.04021 7.81389 5.79642 8.05762C5.55296 8.3016 5.55292 8.69843 5.79642 8.94238L7.35403 10.5L5.79642 12.0586C5.55336 12.3026 5.55317 12.6985 5.79642 12.9424C6.04036 13.1863 6.43707 13.1861 6.68118 12.9424L8.2388 11.3848L9.79642 12.9424C10.0403 13.1863 10.4371 13.186 10.6812 12.9424C10.9253 12.6983 10.9253 12.3017 10.6812 12.0576L9.12259 10.5L10.6812 8.94238C10.9253 8.69831 10.9253 8.30169 10.6812 8.05762Z"
        fill={color}
      />
    </svg>
  );
};
