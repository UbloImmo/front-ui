import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `intercom`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Intercom = (props: CommonIconProps): JSX.Element => {
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
        d="M3.407 7.80236C3.51612 7.47499 3.8699 7.29802 4.19728 7.40698L4.20559 7.40963C4.21398 7.41228 4.22806 7.41665 4.24768 7.42249C4.28694 7.43419 4.34842 7.45179 4.43113 7.47337C4.59657 7.51653 4.84685 7.57556 5.17423 7.63508C5.82909 7.75415 6.79151 7.875 7.99993 7.875C9.20834 7.875 10.1708 7.75415 10.8256 7.63508C11.153 7.57556 11.4033 7.51653 11.5687 7.47337C11.6514 7.45179 11.7129 7.43419 11.7522 7.42249C11.7718 7.41665 11.7859 7.41228 11.7943 7.40963L11.8026 7.40698C12.1299 7.29802 12.4837 7.47499 12.5929 7.80236C12.702 8.12982 12.5247 8.48388 12.1973 8.59303C12.1973 8.59303 12.1976 8.59293 11.9999 8L12.1973 8.59303L12.1961 8.59341L12.1941 8.59406L12.1885 8.5959L12.1707 8.60161C12.1559 8.60628 12.1353 8.61265 12.109 8.62048C12.0565 8.63613 11.9812 8.65759 11.8843 8.68289C11.6903 8.73348 11.4094 8.79944 11.0492 8.86492C10.3291 8.99585 9.29151 9.125 7.99993 9.125C6.70834 9.125 5.67076 8.99585 4.95062 8.86492C4.5905 8.79944 4.30953 8.73348 4.1156 8.68289C4.01862 8.65759 3.94338 8.63613 3.89084 8.62048C3.86457 8.61265 3.84397 8.60628 3.82917 8.60161L3.81134 8.5959L3.80571 8.59406L3.80372 8.59341L3.80228 8.59293L3.99993 8C3.80228 8.59293 3.80228 8.59293 3.80228 8.59293C3.47482 8.48377 3.29784 8.12982 3.407 7.80236Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2C16 0.895431 15.1046 0 14 0H2C0.895431 0 0 0.895431 0 2V10C0 11.1046 0.895431 12 2 12H11.5858C11.851 12 12.1054 12.1054 12.2929 12.2929L15.1464 15.1464C15.4614 15.4614 16 15.2383 16 14.7929V2ZM1 2C1 1.44772 1.44772 1 2 1H14C14.5523 1 15 1.44772 15 2V13.5858L13 11.5858C12.6249 11.2107 12.1162 11 11.5858 11H2C1.44772 11 1 10.5523 1 10V2Z"
        fill={color}
      />
    </svg>
  );
};
