import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `intercom-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const IntercomFill = (props: CommonIconProps): JSX.Element => {
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
        d="M16 2C16 0.895431 15.1046 0 14 0H2C0.895431 0 0 0.895431 0 2V10C0 11.1046 0.895431 12 2 12H11.5858C11.851 12 12.1054 12.1054 12.2929 12.2929L15.1464 15.1464C15.4614 15.4614 16 15.2383 16 14.7929V2ZM4.19728 7.40698C3.8699 7.29802 3.51612 7.47499 3.407 7.80236C3.29784 8.12982 3.47482 8.48377 3.80228 8.59293L3.80372 8.59341L3.80571 8.59406L3.81134 8.5959L3.82917 8.60161C3.84397 8.60628 3.86457 8.61265 3.89084 8.62048C3.94338 8.63613 4.01862 8.65759 4.1156 8.68289C4.30953 8.73348 4.5905 8.79944 4.95062 8.86492C5.67076 8.99585 6.70834 9.125 7.99993 9.125C9.29151 9.125 10.3291 8.99585 11.0492 8.86492C11.4094 8.79944 11.6903 8.73348 11.8843 8.68289C11.9812 8.65759 12.0565 8.63613 12.109 8.62048C12.1353 8.61265 12.1559 8.60628 12.1707 8.60161L12.1885 8.5959L12.1941 8.59406L12.1961 8.59341L12.1973 8.59303C12.5247 8.48388 12.702 8.12982 12.5929 7.80236C12.4837 7.47499 12.1299 7.29802 11.8026 7.40698L11.7943 7.40963C11.7859 7.41228 11.7718 7.41665 11.7522 7.42249C11.7129 7.43419 11.6514 7.45179 11.5687 7.47337C11.4033 7.51653 11.153 7.57556 10.8256 7.63508C10.1708 7.75415 9.20834 7.875 7.99993 7.875C6.79151 7.875 5.82909 7.75415 5.17423 7.63508C4.84685 7.57556 4.59657 7.51653 4.43113 7.47337C4.34842 7.45179 4.28694 7.43419 4.24768 7.42249C4.22806 7.41665 4.21398 7.41228 4.20559 7.40963L4.19728 7.40698Z"
        fill={color}
      />
    </svg>
  );
};
