import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `slash-circle-v2`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const SlashCircleV2 = (props: CommonIconProps): JSX.Element => {
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
        d="M1 8C1 11.866 4.13401 15 8 15C9.75304 15 11.3556 14.3556 12.5836 13.2907L2.70926 3.41637C1.64441 4.64443 1 6.24696 1 8ZM13.2907 12.5836L3.41637 2.70926C4.64443 1.64441 6.24696 1 8 1C11.866 1 15 4.13401 15 8C15 9.75304 14.3556 11.3556 13.2907 12.5836ZM0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8Z"
        fill={color}
      />
    </svg>
  );
};

export default SlashCircleV2;
