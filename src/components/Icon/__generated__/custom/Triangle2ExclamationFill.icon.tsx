import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-exclamation-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2ExclamationFill = (props: CommonIconProps): JSX.Element => {
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
        d="M9.16099 0C9.3644 0 9.54823 0.123117 9.62486 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741067C0.386186 16 0.143631 15.6403 0.2772 15.3115L6.37095 0.311523C6.44756 0.123078 6.63139 0 6.83482 0H9.16099ZM8.00279 11.0283C7.58597 11.0283 7.2479 11.3664 7.2479 11.7832C7.248 12.1999 7.58602 12.5381 8.00279 12.5381C8.41952 12.5381 8.75758 12.1999 8.75767 11.7832C8.75767 11.3664 8.41958 11.0284 8.00279 11.0283ZM8.00181 6.5C7.59772 6.5 7.28191 6.8489 7.32212 7.25098L7.58677 9.89844C7.60824 10.1114 7.7877 10.2734 8.00181 10.2734C8.21582 10.2733 8.39541 10.1114 8.41685 9.89844L8.6815 7.25098C8.72168 6.84899 8.40576 6.50014 8.00181 6.5Z"
        fill={color}
      />
    </svg>
  );
};
