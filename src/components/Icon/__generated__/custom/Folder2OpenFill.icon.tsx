import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `folder2-open-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Folder2OpenFill = (props: CommonIconProps): JSX.Element => {
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
        d="M1.00001 3.5C1.00001 2.67157 1.67158 2 2.50001 2H5.26394C6.22171 2 7.02474 2.55996 7.57542 3.18398C7.98525 3.64839 8.47872 4 9.00001 4H13.5007C14.3296 4 15 4.67203 15 5.5V6.13933C15.5696 6.40467 15.9394 7.0161 15.8556 7.68605L15.2151 12.8101C15.0588 14.0612 13.9953 15 12.7344 15H3.26557C2.00476 15 0.941261 14.0612 0.784877 12.8101L0.144373 7.68605C0.0606283 7.0161 0.430461 6.40467 1.00001 6.13933V3.5ZM2.00001 6H14V5.5C14 5.22341 13.7764 5 13.5007 5H9.00001C8.03611 5 7.28948 4.37127 6.82563 3.84565C6.37382 3.33367 5.82126 3 5.26394 3H2.50001C2.22386 3 2.00001 3.22386 2.00001 3.5V6Z"
        fill={color}
      />
    </svg>
  );
};

export default Folder2OpenFill;
