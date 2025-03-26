import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
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
      <g clipPath="url(#clip0_1279_1792)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0095 1.17441C10.1963 1.2518 10.3181 1.43411 10.3181 1.63635V5.6818H14.3636C14.6398 5.6818 14.8636 5.90566 14.8636 6.1818C14.8636 6.45795 14.6398 6.6818 14.3636 6.6818H10.0253L7.38889 9.31817H10.7272C11.0034 9.31817 11.2272 9.54203 11.2272 9.81817C11.2272 10.0943 11.0034 10.3182 10.7272 10.3182H6.38889L3.75252 12.9545H7.09088C7.36702 12.9545 7.59088 13.1784 7.59088 13.4545C7.59088 13.7307 7.36702 13.9545 7.09088 13.9545H2.75252L1.08079 15.6263C0.885525 15.8215 0.568943 15.8215 0.373681 15.6263C0.178418 15.431 0.178418 15.1144 0.373681 14.9192L2.04542 13.2474V8.90908C2.04542 8.77647 2.0981 8.64929 2.19186 8.55553L9.4646 1.28279C9.6076 1.13979 9.82265 1.09702 10.0095 1.17441ZM3.04542 12.2474V9.11619L5.68178 6.47982V9.61106L3.04542 12.2474ZM6.68178 8.61106V5.47982L9.31815 2.84345V5.9747L6.68178 8.61106Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0755 0.227265C12.5608 0.227026 13.0414 0.322372 13.4898 0.50786C13.9383 0.693385 14.3459 0.965453 14.6893 1.30852C15.0327 1.65159 15.3051 2.05895 15.491 2.50732C15.6769 2.95569 15.7726 3.43629 15.7728 3.92167C15.7728 4.93064 15.3954 5.85916 14.717 6.53561L7.44451 13.8081C7.24925 14.0034 6.93266 14.0034 6.7374 13.8081C6.54214 13.6128 6.54214 13.2963 6.7374 13.101L14.0101 5.82826C14.4915 5.3484 14.7727 4.67823 14.7728 3.92195M12.0755 0.227265C11.0653 0.227337 10.1399 0.610728 9.46551 1.28197C9.26979 1.47677 9.26904 1.79335 9.46384 1.98907C9.65864 2.1848 9.97522 2.18554 10.1709 1.99074C10.6528 1.51114 11.3222 1.22726 12.0755 1.22726C12.4295 1.22706 12.7804 1.29661 13.1076 1.43193C13.4347 1.56725 13.732 1.7657 13.9825 2.01593C14.2329 2.26617 14.4316 2.56329 14.5672 2.89033C14.7028 3.21732 14.7727 3.56797 14.7728 3.92195"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1279_1792" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
