import { useMemo } from "react";
import { CommonIconProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
/**
 * React component generated from custom icon: `apps`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Apps = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_222_1000)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 3.13733C0 2.28486 0.702188 1.59381 1.56838 1.59381H4.70514C5.57133 1.59381 6.27352 2.28486 6.27352 3.13733V6.22437C6.27352 7.07683 5.57133 7.76789 4.70514 7.76789H1.56838C0.702188 7.76789 0 7.07683 0 6.22437V3.13733ZM1.56838 2.62282C1.27965 2.62282 1.04559 2.85317 1.04559 3.13733V6.22437C1.04559 6.50852 1.27965 6.73888 1.56838 6.73888H4.70514C4.99387 6.73888 5.22793 6.50852 5.22793 6.22437V3.13733C5.22793 2.85317 4.99387 2.62282 4.70514 2.62282H1.56838ZM0 11.3694C0 10.517 0.702188 9.82592 1.56838 9.82592H4.70514C5.57133 9.82592 6.27352 10.517 6.27352 11.3694V14.4565C6.27352 15.3089 5.57133 16 4.70514 16H1.56838C0.702188 16 0 15.3089 0 14.4565V11.3694ZM1.56838 10.8549C1.27965 10.8549 1.04559 11.0853 1.04559 11.3694V14.4565C1.04559 14.7406 1.27965 14.971 1.56838 14.971H4.70514C4.99387 14.971 5.22793 14.7406 5.22793 14.4565V11.3694C5.22793 11.0853 4.99387 10.8549 4.70514 10.8549H1.56838ZM8.36469 11.3694C8.36469 10.517 9.06688 9.82592 9.93307 9.82592H13.0698C13.936 9.82592 14.6382 10.517 14.6382 11.3694V14.4565C14.6382 15.3089 13.936 16 13.0698 16H9.93307C9.06688 16 8.36469 15.3089 8.36469 14.4565V11.3694ZM9.93307 10.8549C9.64434 10.8549 9.41028 11.0853 9.41028 11.3694V14.4565C9.41028 14.7406 9.64434 14.971 9.93307 14.971H13.0698C13.3586 14.971 13.5926 14.7406 13.5926 14.4565V11.3694C13.5926 11.0853 13.3586 10.8549 13.0698 10.8549H9.93307Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3566 0.772018C10.7897 0.0337632 11.7489 -0.219181 12.499 0.20705L15.2155 1.75057C15.9657 2.1768 16.2227 3.1208 15.7896 3.85906L14.2212 6.53252C13.7881 7.27077 12.8289 7.52372 12.0788 7.09748L9.36227 5.55396C8.61213 5.12773 8.35511 4.18373 8.78821 3.44547L10.3566 0.772018Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_222_1000">
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
