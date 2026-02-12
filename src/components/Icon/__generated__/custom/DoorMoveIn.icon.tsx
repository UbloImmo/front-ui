import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `door-move-in`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const DoorMoveIn = (props: CommonIconProps): JSX.Element => {
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
        d="M4.64645 6.64645C4.45118 6.84171 4.45118 7.15829 4.64645 7.35355C4.84171 7.54882 5.15829 7.54882 5.35355 7.35355L7.85355 4.85355C7.90149 4.80561 7.93766 4.75036 7.96206 4.69139C7.98615 4.63331 7.9996 4.5697 7.99999 4.503L8 4.5L7.99999 4.497C7.9996 4.4303 7.98615 4.36669 7.96206 4.30861C7.93766 4.24964 7.90149 4.19439 7.85355 4.14645L5.35355 1.64645C5.15829 1.45118 4.84171 1.45118 4.64645 1.64645C4.45119 1.84171 4.45118 2.15829 4.64645 2.35355L6.29289 4L0.5 4C0.223857 4 0 4.22386 0 4.5C0 4.77614 0.223857 5 0.5 5L6.29289 5L4.64645 6.64645Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0.500003C12 0.355058 11.9371 0.217245 11.8276 0.122276C11.7181 0.0273076 11.5728 -0.0154699 11.4293 0.00502854L5.89457 0.795702C5.95252 0.838858 6.00806 0.886738 6.06066 0.939341L6.7981 1.67678L11 1.07651V15H5V8.5C4.64208 8.5 4.28417 8.3727 4 8.11809V15H2.5C2.22386 15 2 15.2239 2 15.5C2 15.7761 2.22386 16 2.5 16H15.5C15.7761 16 16 15.7761 16 15.5C16 15.2239 15.7761 15 15.5 15H14V2.5C14 1.67158 13.3284 1 12.5 1H12V0.500003ZM12 2H12.5C12.7761 2 13 2.22386 13 2.5V15H12V2Z"
        fill={color}
      />
      <path
        d="M9 9C9 9.55229 9.22386 10 9.5 10C9.77614 10 10 9.55229 10 9C10 8.44772 9.77614 8 9.5 8C9.22386 8 9 8.44772 9 9Z"
        fill={color}
      />
    </svg>
  );
};

export default DoorMoveIn;
