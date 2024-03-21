import { useMemo } from "react";
import { CommonIconProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
/**
 * React component generated from custom icon: `apps-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const AppsFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_222_1001)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 3.13733C0 2.28486 0.702188 1.59381 1.56838 1.59381H4.70514C5.57133 1.59381 6.27352 2.28486 6.27352 3.13733V6.22437C6.27352 7.07683 5.57133 7.76789 4.70514 7.76789H1.56838C0.702188 7.76789 0 7.07683 0 6.22437V3.13733ZM0 11.3694C0 10.517 0.702188 9.82592 1.56838 9.82592H4.70514C5.57133 9.82592 6.27352 10.517 6.27352 11.3694V14.4565C6.27352 15.3089 5.57133 16 4.70514 16H1.56838C0.702188 16 0 15.3089 0 14.4565V11.3694ZM8.36469 11.3694C8.36469 10.517 9.06688 9.82592 9.93307 9.82592H13.0698C13.936 9.82592 14.6382 10.517 14.6382 11.3694V14.4565C14.6382 15.3089 13.936 16 13.0698 16H9.93307C9.06688 16 8.36469 15.3089 8.36469 14.4565V11.3694Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3566 0.772018C10.7897 0.0337632 11.7489 -0.219181 12.499 0.20705L15.2155 1.75057C15.9657 2.1768 16.2227 3.1208 15.7896 3.85906L14.2212 6.53252C13.7881 7.27077 12.8289 7.52372 12.0788 7.09748L9.36227 5.55396C8.61213 5.12773 8.35511 4.18373 8.78821 3.44547L10.3566 0.772018ZM11.9762 1.0982C11.7262 0.956126 11.4065 1.04044 11.2621 1.28652L9.69371 3.95998C9.54935 4.20607 9.63502 4.52073 9.88507 4.66281L12.6016 6.20633C12.8516 6.34841 13.1714 6.26409 13.3157 6.01801L14.8841 3.34455C15.0285 3.09847 14.9428 2.7838 14.6928 2.64172L11.9762 1.0982Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_222_1001">
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
