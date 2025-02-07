import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `hexagon-question-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const HexagonQuestionFill = (props: CommonIconProps): JSX.Element => {
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
        d="M7.49998 0.133975C7.80938 -0.0446582 8.19058 -0.0446582 8.49998 0.133975L14.5 3.71132C14.8094 3.88995 15 4.22008 15 4.57734V11.4226C15 11.7799 14.8094 12.11 14.5 12.2887L8.49998 15.866C8.19058 16.0447 7.80938 16.0447 7.49998 15.866L1.5 12.2887C1.1906 12.11 1 11.7799 1 11.4226V4.57734C1 4.22008 1.1906 3.88995 1.5 3.71132L7.49998 0.133975ZM5.49159 6.13272C5.35516 6.13272 5.24277 6.02237 5.25036 5.88615C5.34489 4.19062 6.73356 3.60001 8.00064 3.60001C9.39713 3.60001 10.673 4.32999 10.673 5.84073C10.673 6.91983 10.0382 7.43399 9.42887 7.89737C8.69254 8.45596 8.41959 8.66544 8.41959 9.38272V9.48819C8.41959 9.62626 8.30766 9.73819 8.16959 9.73819H7.35857C7.22183 9.73819 7.11047 9.62834 7.10859 9.49161L7.10562 9.27481C7.06754 8.34805 7.60074 7.77676 8.27359 7.28799C8.86392 6.84366 9.23844 6.55167 9.23844 5.9169C9.23844 5.09171 8.61002 4.74893 7.92447 4.74893C7.12175 4.74893 6.67143 5.22719 6.58248 5.88332C6.56393 6.02013 6.45414 6.13272 6.31607 6.13272H5.49159ZM7.81656 12.5756C7.23258 12.5756 6.80728 12.182 6.80728 11.6488C6.80728 11.0966 7.23258 10.7094 7.81656 10.7094C8.42594 10.7094 8.84488 11.0966 8.84488 11.6488C8.84488 12.182 8.42594 12.5756 7.81656 12.5756Z"
        fill={color}
      />
    </svg>
  );
};
