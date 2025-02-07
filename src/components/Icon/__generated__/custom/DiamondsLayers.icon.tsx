import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `diamonds-layers`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const DiamondsLayers = (props: CommonIconProps): JSX.Element => {
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
        d="M8.33926 14.1643L8.00001 13.8251L7.66077 14.1643C7.07498 14.7501 6.12524 14.7501 5.53945 14.1643L0.448281 9.07314C-0.137505 8.48735 -0.137504 7.5376 0.448282 6.95182L5.53945 1.86065C6.12524 1.27486 7.07498 1.27486 7.66077 1.86065L8.00001 2.19988L8.33926 1.86063C8.92504 1.27485 9.87479 1.27485 10.4606 1.86064L15.5517 6.95181C16.1375 7.53759 16.1375 8.48734 15.5517 9.07312L10.4606 14.1643C9.87479 14.7501 8.92504 14.7501 8.33926 14.1643ZM6.95366 2.56775L12.0448 7.65892C12.2401 7.85419 12.2401 8.17077 12.0448 8.36603L6.95366 13.4572C6.7584 13.6525 6.44182 13.6525 6.24656 13.4572L1.15539 8.36603C0.960127 8.17077 0.960126 7.85419 1.15539 7.65892L6.24656 2.56775C6.44182 2.37249 6.7584 2.37249 6.95366 2.56775Z"
        fill={color}
      />
    </svg>
  );
};
