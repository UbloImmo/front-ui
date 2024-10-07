import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `feather-3`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Feather3 = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1055_144)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0095 1.17444C10.1963 1.25183 10.3181 1.43415 10.3181 1.63638V5.68183H14.3636C14.6398 5.68183 14.8636 5.90569 14.8636 6.18183C14.8636 6.45798 14.6398 6.68183 14.3636 6.68183H10.0253L7.38889 9.3182H10.7272C11.0034 9.3182 11.2272 9.54206 11.2272 9.8182C11.2272 10.0943 11.0034 10.3182 10.7272 10.3182H6.38889L3.75252 12.9546H7.09088C7.36702 12.9546 7.59088 13.1784 7.59088 13.4546C7.59088 13.7307 7.36702 13.9546 7.09088 13.9546H2.75252L1.08079 15.6263C0.885525 15.8216 0.568943 15.8216 0.373681 15.6263C0.178418 15.431 0.178418 15.1145 0.373681 14.9192L2.04542 13.2475V8.90911C2.04542 8.7765 2.0981 8.64932 2.19186 8.55556L9.4646 1.28282C9.6076 1.13982 9.82265 1.09705 10.0095 1.17444ZM3.04542 12.2475V9.11622L5.68178 6.47985V9.61109L3.04542 12.2475ZM6.68178 8.61109V5.47985L9.31815 2.84348V5.97473L6.68178 8.61109Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0755 0.227295C12.5608 0.227057 13.0414 0.322402 13.4898 0.507891C13.9383 0.693416 14.3459 0.965483 14.6893 1.30855C15.0327 1.65163 15.3051 2.05898 15.491 2.50735C15.6769 2.95572 15.7726 3.43632 15.7728 3.9217C15.7728 4.93067 15.3954 5.85919 14.717 6.53564L7.44451 13.8081C7.24925 14.0034 6.93266 14.0034 6.7374 13.8081C6.54214 13.6129 6.54214 13.2963 6.7374 13.101L14.0101 5.82829C14.4915 5.34843 14.7727 4.67826 14.7728 3.92199M12.0755 0.227295C11.0653 0.227367 10.1399 0.610759 9.46551 1.282C9.26979 1.4768 9.26904 1.79338 9.46384 1.9891C9.65864 2.18483 9.97522 2.18558 10.1709 1.99078C10.6528 1.51117 11.3222 1.2273 12.0755 1.2273C12.4295 1.22709 12.7804 1.29664 13.1076 1.43196C13.4347 1.56728 13.732 1.76573 13.9825 2.01596C14.2329 2.2662 14.4316 2.56332 14.5672 2.89036C14.7028 3.21736 14.7727 3.568 14.7728 3.92199"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1055_144" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
