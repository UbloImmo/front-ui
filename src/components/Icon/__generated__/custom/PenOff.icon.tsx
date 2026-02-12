import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `pen-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const PenOff = (props: CommonIconProps): JSX.Element => {
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
        d="M15.1464 4.56067L10.9142 8.7929L10.2071 8.08579L14.4393 3.85356C14.6346 3.6583 14.6346 3.34172 14.4393 3.14646L12.8535 1.56067C12.6583 1.36541 12.3417 1.36541 12.1464 1.56067L7.9142 5.7929L7.2071 5.0858L10.7877 1.5052C10.5926 1.3676 10.321 1.38609 10.1464 1.56067L6.91421 4.7929L6.2071 4.0858L9.43933 0.853566C10.0053 0.287594 10.911 0.268451 11.5 0.796137C12.0678 0.287433 12.9299 0.286925 13.4983 0.794612L13.6464 0.64646C14.1178 0.175056 14.8821 0.175056 15.3535 0.64646C15.8249 1.11786 15.8249 1.88216 15.3535 2.35356L15.2054 2.50172C15.7315 3.09071 15.7119 3.99524 15.1464 4.56067Z"
        fill={color}
      />
      <path
        d="M4.24438 14.0485L8.08578 10.2071L8.79288 10.9142L4.85355 14.8535C4.78948 14.9176 4.70919 14.9631 4.62127 14.9851L0.621277 15.9851C0.45089 16.0277 0.270647 15.9777 0.146457 15.8535C0.022267 15.7293 -0.0276575 15.5491 0.0149393 15.3787L1.01494 11.3787C1.03692 11.2908 1.08238 11.2105 1.14646 11.1464L5.08578 7.20711L5.79289 7.91422L1.95149 11.7556L1.18719 14.8128L4.24438 14.0485Z"
        fill={color}
      />
      <path
        d="M14.1483 14.8554C14.3436 15.0507 14.6602 15.0507 14.8554 14.8554C15.0507 14.6602 15.0507 14.3436 14.8554 14.1483L1.85547 1.14836C1.6602 0.953098 1.34362 0.953098 1.14836 1.14836C0.953098 1.34362 0.953097 1.6602 1.14836 1.85546L14.1483 14.8554Z"
        fill={color}
      />
    </svg>
  );
};

export default PenOff;
