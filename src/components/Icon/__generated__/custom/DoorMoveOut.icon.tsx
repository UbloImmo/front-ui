import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `door-move-out`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const DoorMoveOut = (props: CommonIconProps): JSX.Element => {
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
        d="M7.5 10C7.22386 10 7 9.55229 7 9C7 8.44772 7.22386 8 7.5 8C7.77614 8 8 8.44772 8 9C8 9.55229 7.77614 10 7.5 10Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.8276 0.122276C9.9371 0.217245 10 0.355058 10 0.500003V1H10.5C11.3284 1 12 1.67158 12 2.5V2.99713H11V2.5C11 2.22386 10.7761 2 10.5 2H10V3.99713H14.2929L12.6464 2.35068C12.4512 2.15542 12.4512 1.83884 12.6464 1.64358C12.8417 1.44832 13.1583 1.44832 13.3536 1.64358L15.8536 4.14358C16.0488 4.33884 16.0488 4.65542 15.8536 4.85068L13.3536 7.35068C13.1583 7.54595 12.8417 7.54595 12.6464 7.35068C12.4512 7.15542 12.4512 6.83884 12.6464 6.64358L14.2929 4.99713L10 4.99713V15H11V5.99713H12V15H13.5C13.7761 15 14 15.2239 14 15.5C14 15.7761 13.7761 16 13.5 16H0.5C0.223858 16 0 15.7761 0 15.5C0 15.2239 0.223858 15 0.5 15H2V1.5C2 1.25118 2.18297 1.04022 2.42929 1.00503L9.42929 0.00502854C9.57278 -0.0154699 9.7181 0.0273076 9.8276 0.122276ZM3 1.93365V15H9V1.07651L3 1.93365Z"
        fill={color}
      />
    </svg>
  );
};
