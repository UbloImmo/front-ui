import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `diamond-key-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const DiamondKeyFill = (props: CommonIconProps): JSX.Element => {
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
        d="M8.82733 5.74408C8.98361 5.5878 9.19557 5.5 9.41659 5.5C9.6376 5.5 9.84956 5.5878 10.0058 5.74408C10.1621 5.90036 10.2499 6.11232 10.2499 6.33333C10.2499 6.55435 10.1621 6.76631 10.0058 6.92259C9.84956 7.07887 9.6376 7.16667 9.41659 7.16667C9.19557 7.16667 8.98361 7.07887 8.82733 6.92259C8.67105 6.76631 8.58325 6.55435 8.58325 6.33333C8.58325 6.11232 8.67105 5.90036 8.82733 5.74408Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.04941 0.434679C8.46984 -0.144892 7.53017 -0.144894 6.95059 0.434678L0.434679 6.95059C-0.144892 7.53016 -0.144894 8.46983 0.434678 9.04941L6.95059 15.5653C7.53016 16.1449 8.46983 16.1449 9.04941 15.5653L15.5653 9.04941C16.1449 8.46984 16.1449 7.53017 15.5653 6.95059L9.04941 0.434679ZM9.41659 4.5C8.93036 4.5 8.46404 4.69315 8.12022 5.03697C7.77641 5.38079 7.58325 5.8471 7.58325 6.33333C7.58325 6.64898 7.66465 6.95624 7.81583 7.22704L6.73481 8.30806L6.7297 8.3131L6.72466 8.31822L5.39645 9.64643C5.20118 9.84169 5.20118 10.1583 5.39645 10.3535L6.39645 11.3535C6.59171 11.5488 6.90829 11.5488 7.10355 11.3535C7.29882 11.1583 7.29882 10.8417 7.10355 10.6464L6.45711 9.99998L7.08329 9.3738L7.7297 10.0202C7.92496 10.2155 8.24154 10.2155 8.43681 10.0202C8.63207 9.82495 8.63207 9.50837 8.43681 9.3131L7.79039 8.66669L8.52296 7.93413C8.79374 8.08528 9.10097 8.16667 9.41659 8.16667C9.90282 8.16667 10.3691 7.97351 10.7129 7.6297C11.0568 7.28588 11.2499 6.81956 11.2499 6.33333C11.2499 5.8471 11.0568 5.38079 10.7129 5.03697C10.3691 4.69315 9.90282 4.5 9.41659 4.5Z"
        fill={color}
      />
    </svg>
  );
};

export default DiamondKeyFill;
